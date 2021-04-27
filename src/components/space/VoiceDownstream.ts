import SignalingChannel, {ContentType} from './SignalingChannel';
import {createImmutableMediaTrackFromTrack} from './VoiceImmutableMediaTrack';
import VoiceSDK from './VoiceSDK';

export type SubscriptionRequestTarget = {
	userID: string;
	contentType: ContentType;
};

export function getStreamTargetFromStreamID(
	id: string
): {userID: string; streamType: 'user' | 'screen'} {
	const [contentType, userID] = id.split(':');
	switch (contentType) {
		case 'userAudio':
		case 'userVideo':
			return {userID, streamType: 'user'};
		case 'screenVideo':
			return {userID, streamType: 'screen'};
		default:
			throw new Error('invalid stream content type');
	}
}

const SUBSCRIPTION_REQUEST_TIMEOUT = 30000;

export default class VoiceDownstream {
	private signalingChannel: SignalingChannel;
	private connection: RTCPeerConnection;
	private subscribeTimeouts = new Map<
		SubscriptionRequestTarget,
		NodeJS.Timeout
	>();
	// ICE candidates need to be added when a remote session description has been created.
	// See https://stackoverflow.com/questions/38198751/domexception-error-processing-ice-candidate
	private iceCandidateQueue: RTCIceCandidateInit[] = [];

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
		const {userID, streamType} = getStreamTargetFromStreamID(stream.id);
		const contentType: ContentType =
			streamType === 'user'
				? track.kind === 'audio'
					? 'userAudio'
					: 'userVideo'
				: 'screenVideo';

		this.clearSubscribeTimeout({userID, contentType});

		const immutableMediaTrack = createImmutableMediaTrackFromTrack(
			track,
			contentType,
			true
		);

		track.addEventListener('ended', () => {
			this.voiceSDK.removeTrackByID(immutableMediaTrack.trackID, userID);
		});

		this.voiceSDK.addTrack(immutableMediaTrack, userID);
	}

	private startSubscribeTimeout(target: SubscriptionRequestTarget) {
		if (!this.subscribeTimeouts.has(target)) {
			this.subscribeTimeouts.set(
				target,
				setTimeout(() => {
					console.error(`Subscription request for target ${target} failed`);
				}, SUBSCRIPTION_REQUEST_TIMEOUT)
			);
		}
	}

	private clearSubscribeTimeout(target: SubscriptionRequestTarget) {
		if (this.subscribeTimeouts.has(target)) {
			const timeoutID = this.subscribeTimeouts.get(target)!;
			clearTimeout(timeoutID);
			this.subscribeTimeouts.delete(target);
		}
	}

	/**
	 * This will send a request to the SFU to receive one of a user's media tracks.
	 * It starts a timer, and if the request is not fulfilled within the allotted time,
	 * an error will be logged.
	 * If the request is successful, the track will be added to the Voice state for the
	 * requested user.
	 */
	sendSubscribeRequest(target: SubscriptionRequestTarget) {
		this.signalingChannel.sendSubscribeRequest(target);
		this.startSubscribeTimeout(target);
	}

	/**
	 * This will send a request to the SFU to stop receiving one of a user's media tracks.
	 * This one is not promise-based.
	 */
	sendUnsubscribeRequest(target: SubscriptionRequestTarget) {
		this.signalingChannel.sendUnsubscribeRequest(target);
	}
}
