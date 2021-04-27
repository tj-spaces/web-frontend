import SignalingChannel from './SignalingChannel';
import {createImmutableMediaTrackFromTrack} from './VoiceImmutableMediaTrack';
import VoiceSDK from './VoiceSDK';

export type SubscriptionDescriptor = {
	streamID: string;
	constraints: SubscriptionStreamConstraints;
};

export type SubscriptionStreamConstraints = {
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
	private iceCandidateQueue: RTCIceCandidateInit[] = [];
	private confirmedReceivedSubscriptionTargets = new Set<SubscriptionDescriptor>();

	constructor(signalingUrl: string, private voiceSDK: VoiceSDK) {
		this.signalingChannel = new SignalingChannel(signalingUrl);
		this.connection = new RTCPeerConnection();
		this.connection.addEventListener('track', (event) => {
			this.handleTrackEvent(event);
		});

		this.signalingChannel.onSdp(async (sdp) => {
			if (sdp.type === 'offer') {
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
			await this.connection.addIceCandidate(candidate);
		});
	}

	private async createAnswer() {
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

		const immutableMediaTrack = createImmutableMediaTrackFromTrack(
			track,
			stream.id,
			true
		);

		track.addEventListener('ended', () => {
			this.voiceSDK.removeTrackByID(immutableMediaTrack.trackID, stream.id);
			// this.subscriptionTargetEnded(reconstructedSubscriptionTarget);
		});

		this.voiceSDK.addTrack(immutableMediaTrack, stream.id);
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
	sendSubscribeRequest(
		streamID: string,
		constraints: SubscriptionStreamConstraints
	) {
		this.signalingChannel.sendSubscriptionUpdate(streamID, constraints);
		// this.startSubscribeTimeout(target);
	}
}