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
	private rtpSendersByTrackId = new Map<string, RTCRtpSender>();
	private currentlySendingTracks = new Set<MediaStreamTrack>();

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
		this.currentlySendingTracks.clear();
		this.rtpSendersByTrackId.clear();
	}

	startSendingTrack(track: MediaStreamTrack, stream: MediaStream) {
		if (this.currentlySendingTracks.has(track)) {
			console.warn('startSendingTrack on track that is already being sent');
		} else {
			const sender = this.connection.addTrack(track, stream);
			this.rtpSendersByTrackId.set(track.id, sender);
			this.currentlySendingTracks.add(track);
		}
	}

	getCurrentlySendingTracks() {
		return this.currentlySendingTracks;
	}

	stopSendingTrackById(trackId: string) {
		if (this.rtpSendersByTrackId.has(trackId)) {
			const sender = this.rtpSendersByTrackId.get(trackId)!;
			if (sender.track) {
				this.currentlySendingTracks.delete(sender.track);
			}
			this.connection.removeTrack(sender);
			this.rtpSendersByTrackId.delete(trackId);
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
