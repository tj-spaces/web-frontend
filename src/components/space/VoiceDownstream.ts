import SignalingChannel, {ContentType} from './SignalingChannel';

export type SubscriptionRequestTarget = {
	userID: string;
	contentType: ContentType;
};

type StreamHandler = (stream: MediaStream) => void;

export function getStreamTargetFromStreamID(
	id: string
): SubscriptionRequestTarget {
	const [contentType, userID] = id.split(':');
	switch (contentType) {
		case 'userAudio':
		case 'userVideo':
		case 'screenVideo':
			return {userID, contentType};
		default:
			throw new Error('invalid stream content type');
	}
}

export default class VoiceDownstream {
	private signalingChannel: SignalingChannel;
	private connection: RTCPeerConnection;
	private streamHandlers = new Map<SubscriptionRequestTarget, StreamHandler>();

	constructor(signalingUrl: string) {
		this.signalingChannel = new SignalingChannel(signalingUrl);
		this.connection = new RTCPeerConnection();
		this.connection.addEventListener('track', (event) => {
			event.streams.forEach((stream) => {});
		});

		const sdpListener = this.signalingChannel.onSdp(async (sdp) => {
			sdpListener.remove();
			if (sdp.type === 'offer') {
				this.connection.setRemoteDescription(sdp);
				await this.createAnswer();
			}
		});
	}

	private async createAnswer() {
		const answer = await this.connection.createAnswer();
		this.signalingChannel.sendAnswer(answer);
	}

	private addNewStreamListener(
		userID: string,
		contentType: 'userAudio' | 'userVideo' | 'screenVideo',
		handler: StreamHandler
	) {
		const key = {userID, contentType};
		this.streamHandlers.set(key, handler);
		return {
			remove: () => {
				this.streamHandlers.delete(key);
			},
		};
	}

	private async waitForStream(
		userID: string,
		contentType: ContentType,
		timeout: number = -1
	) {
		const streamPromise = new Promise<MediaStream>((resolve, reject) => {
			const listener = this.addNewStreamListener(
				userID,
				contentType,
				(stream) => {
					listener.remove();
					resolve(stream);
				}
			);
		});

		if (timeout !== -1) {
			return await Promise.race([
				streamPromise,
				new Promise((resolve, reject) => {
					setTimeout(() => reject('timeout'), timeout);
				}),
			]);
		} else {
			return await streamPromise;
		}
	}

	async requestStream(target: SubscriptionRequestTarget, timeout: number = -1) {
		this.signalingChannel.sendSubscribeRequest(
			target.userID,
			target.contentType
		);

		return await this.waitForStream(target.userID, target.contentType, timeout);
	}
}
