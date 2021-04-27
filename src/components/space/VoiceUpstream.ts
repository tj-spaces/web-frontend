import SignalingChannel from './SignalingChannel';

export const defaultVoiceUpstreamPeerConnectionConfig: RTCConfiguration = {
	iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
};

export default class VoiceUpstream {
	private connection: RTCPeerConnection;
	private waitingForAnswerToSendNextOffer = false;
	private initialOfferSent = false;
	private initialAnswerReceived = false;
	private signalingChannel: SignalingChannel;
	private rtpSendersByTrackID = new Map<string, RTCRtpSender>();
	private streamByContentType = new Map<'screen' | 'user', MediaStream>();

	constructor(public readonly signalingUrl: string) {
		this.connection = new RTCPeerConnection(
			defaultVoiceUpstreamPeerConnectionConfig
		);
		this.signalingChannel = new SignalingChannel(signalingUrl);
		this.createOffer();
	}

	stopSendingAnyTracks() {
		this.connection.getSenders().forEach((sender) => {
			this.connection.removeTrack(sender);
		});
		this.rtpSendersByTrackID.clear();
	}

	private getOrCreateStreamForContentType(
		type: 'screen' | 'user'
	): MediaStream {
		if (this.streamByContentType.has(type)) {
			return this.streamByContentType.get(type)!;
		} else {
			const stream = new MediaStream();
			this.streamByContentType.set(type, stream);
			return stream;
		}
	}

	startSendingTrack(track: MediaStreamTrack, type: 'screen' | 'user') {
		const stream = this.getOrCreateStreamForContentType(type);
		if (stream.getTracks().includes(track)) {
			console.warn('Already sending track');
			return;
		}

		stream.addTrack(track);
		const sender = this.connection.addTrack(track, stream);
		this.rtpSendersByTrackID.set(track.id, sender);
	}

	stopSendingTrackByID(trackID: string) {
		if (this.rtpSendersByTrackID.has(trackID)) {
			const sender = this.rtpSendersByTrackID.get(trackID);
			if (!sender) {
				console.error('Could not find RTPSender for trackID', trackID);
			} else {
				this.connection.removeTrack(sender);
			}
			this.rtpSendersByTrackID.delete(trackID);
		}
	}

	private async renegotiate() {
		if (!this.initialAnswerReceived) {
			this.waitingForAnswerToSendNextOffer = true;
		} else {
			await this.createOffer();
		}
	}

	private async createOffer() {
		const offer = await this.connection.createOffer();
		this.signalingChannel.sendOffer(offer);
		this.initialOfferSent = true;

		const listener = this.signalingChannel.onSdp((answer) => {
			this.connection.setRemoteDescription(answer);
			this.initialAnswerReceived = true;
			if (this.waitingForAnswerToSendNextOffer) {
				this.waitingForAnswerToSendNextOffer = false;
				this.renegotiate();
			}
			listener.remove();
		});
	}
}
