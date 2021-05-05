import AirwaveLoggerGlobal from './AirwaveLogger';
import SignalingChannel from './SignalingChannel';
import {createImmutableMediaTrackFromTrack} from './VoiceImmutableMediaTrack';
import VoiceSDK from './VoiceSDK';

export type SubscriptionDescriptor = {
	streamID: string;
	constraints: SubscriptionState;
};

export type SubscriptionState = {
	audio?: boolean;
	video?: boolean;
};

export function getStreamTargetFromStreamID(
	id: string
): {userID: string; streamLabel: string} {
	const [userID, streamLabel] = id.split(':');
	return {userID, streamLabel};
}

// eslint-disable-next-line
const SUBSCRIPTION_REQUEST_TIMEOUT = 30000;

export default class VoiceDownstream {
	private signalingChannel: SignalingChannel;
	private connection: RTCPeerConnection;
	private subscribeTimeouts = new Map<SubscriptionDescriptor, NodeJS.Timeout>();
	// ICE candidates need to be added when a remote session description has been created.
	// See https://stackoverflow.com/questions/38198751/domexception-error-processing-ice-candidate
	private iceCandidateQueue: RTCIceCandidate[] = [];

	constructor(signalingUrl: string, private voiceSDK: VoiceSDK) {
		this.signalingChannel = new SignalingChannel(signalingUrl + '/subscribe');
		this.connection = new RTCPeerConnection();
		this.connection.addEventListener('track', (event) => {
			this.handleTrackEvent(event);
		});
		this.connection.addEventListener('icecandidate', (event) => {
			if (event.candidate) {
				AirwaveLoggerGlobal.checkpoint('receiveSubscriberICECandidate');
				this.signalingChannel.sendIceCandidate(event.candidate);
			}
		});

		this.signalingChannel.onSdp(async (sdp) => {
			if (sdp.type === 'offer') {
				AirwaveLoggerGlobal.checkpoint('receiveSubscriberOffer');
				this.connection.setRemoteDescription(sdp);
				if (this.iceCandidateQueue) {
					await Promise.all(
						this.iceCandidateQueue.map((candidate) =>
							this.connection.addIceCandidate(candidate)
						)
					);
					this.iceCandidateQueue = [];
				}
				await this.createAnswer();
			} else {
				console.warn('Received non-offer from Voice Downstream');
			}
		});

		this.signalingChannel.onIceCandidate(async (candidate) => {
			if (this.connection.remoteDescription) {
				await this.connection.addIceCandidate(candidate);
			} else {
				this.iceCandidateQueue.push(candidate);
			}
		});
	}

	connect(userID: string) {
		this.signalingChannel.connect(userID);
	}

	private async createAnswer() {
		AirwaveLoggerGlobal.checkpoint('createAnswer');
		const answer = await this.connection.createAnswer();
		this.signalingChannel.sendAnswer(answer);
	}

	private handleTrackEvent(event: RTCTrackEvent) {
		const [stream] = event.streams;
		const track = event.track;
		if (!stream) {
			throw new Error(
				'Invariant: Track had no stream: ' + JSON.stringify(event.track)
			);
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [userID, streamTag] = stream.id.split(':');

		const immutableMediaTrack = createImmutableMediaTrackFromTrack(
			track,
			stream.id,
			true
		);

		track.addEventListener('ended', () => {
			this.voiceSDK.removeTrackByID(
				userID,
				immutableMediaTrack.trackID,
				stream.id
			);
		});

		this.voiceSDK.addTrack(immutableMediaTrack, stream.id, userID);
	}

	// private startSubscribeTimeout(target: SubscriptionDescriptor) {
	// 	if (!this.subscribeTimeouts.has(target)) {
	// 		this.subscribeTimeouts.set(
	// 			target,
	// 			setTimeout(() => {
	// 				console.error(`Subscription request for target ${target} failed`);
	// 			}, SUBSCRIPTION_REQUEST_TIMEOUT)
	// 		);
	// 	}
	// }

	// private clearSubscribeTimeout(target: SubscriptionDescriptor) {
	// 	if (this.subscribeTimeouts.has(target)) {
	// 		const timeoutID = this.subscribeTimeouts.get(target)!;
	// 		clearTimeout(timeoutID);
	// 		this.subscribeTimeouts.delete(target);
	// 	}
	// }

	// private subscriptionTargetAdded(target: SubscriptionDescriptor) {
	// 	this.clearSubscribeTimeout(target);
	// 	this.confirmedReceivedSubscriptionTargets.add(target);
	// }

	// private subscriptionTargetEnded(target: SubscriptionDescriptor) {
	// 	this.confirmedReceivedSubscriptionTargets.delete(target);
	// }

	/**
	 * This will send a request to the SFU to receive one of a user's media tracks.
	 * It starts a timer, and if the request is not fulfilled within the allotted time,
	 * an error will be logged.
	 * If the request is successful, the track will be added to the Voice state for the
	 * requested user.
	 */
	sendSubscribeRequest(streamID: string, constraints: SubscriptionState) {
		this.signalingChannel.sendSubscriptionUpdate(streamID, constraints);
		// this.startSubscribeTimeout(target);
	}
}
