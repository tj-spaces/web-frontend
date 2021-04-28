import AirwaveLoggerGlobal from './AirwaveLogger';
import SignalingChannel from './SignalingChannel';
import VoiceImmutableMediaTrack from './VoiceImmutableMediaTrack';

export const defaultVoiceUpstreamPeerConnectionConfig: RTCConfiguration = {
	iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
};

class VoiceUpstreamTrack {
	private rtpSender: RTCRtpSender | null = null;

	constructor(
		private pc: RTCPeerConnection,
		private track: MediaStreamTrack,
		private contentType: 'screen' | 'user'
	) {}

	send(stream: MediaStream) {
		this.rtpSender = this.pc.addTrack(this.track, stream);
	}

	unsend() {
		if (this.rtpSender) {
			this.pc.removeTrack(this.rtpSender);
			this.rtpSender = null;
		} else {
			console.warn('RTP sender did not exist when unsending track');
		}
	}
}

export default class VoiceUpstream {
	private connection: RTCPeerConnection;
	private waitingForAnswerToSendNextOffer = false;
	private initialOfferSent = false;
	private initialAnswerReceived = false;
	private signalingChannel: SignalingChannel;
	private tracks = new Map<string, VoiceUpstreamTrack>();
	private streamByContentType = new Map<'screen' | 'user', MediaStream>();

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
		this.tracks.clear();
	}

	startSendingTrack(track: VoiceImmutableMediaTrack, type: 'screen' | 'user') {
		if (this.tracks.has(track.trackID)) {
			console.warn(
				'Already sending track [found in internal cache]',
				track.toJS()
			);
			return;
		}

		if (!track.webrtcTrack) {
			console.warn('webRTC track does not exist for local', type, 'track');
			return;
		}

		const stream = this.getOrCreateStreamForContentType(type);
		if (stream.getTracks().includes(track.webrtcTrack!)) {
			console.warn('Already sending track [found in stream]', track.toJS());
			return;
		}

		const voiceUpstreamTrack = new VoiceUpstreamTrack(
			this.connection,
			track.webrtcTrack,
			type
		);
		this.tracks.set(track.trackID, voiceUpstreamTrack);
		voiceUpstreamTrack.send(stream);
	}

	stopSendingTrackByID(trackID: string) {
		if (this.tracks.has(trackID)) {
			const voiceUpstreamTrack = this.tracks.get(trackID)!;
			voiceUpstreamTrack.unsend();
			this.tracks.delete(trackID);
		} else {
			AirwaveLoggerGlobal.mustfix(
				'Could not find track when unsending track: id %p',
				trackID
			);
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
