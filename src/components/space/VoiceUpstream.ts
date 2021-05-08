import AirwaveLoggerGlobal from './airwave/AirwaveLogger';
import SignalingChannel, {StreamDescription} from './SignalingChannel';
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
	private connected = false;
	private initialOfferSent = false;
	private initialAnswerReceived = false;
	private signalingChannel: SignalingChannel;
	private tracks = new Map<string, VoiceUpstreamTrack>();
	private streamByContentType = new Map<'screen' | 'user', MediaStream>();
	private iceCandidates: RTCIceCandidate[] = [];

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
		this.connection.addEventListener('icecandidate', (event) => {
			const candidate = event.candidate;
			if (candidate) {
				this.iceCandidates.push(candidate);
				if (this.connected) {
					this.signalingChannel.sendIceCandidate(candidate);
				}
			}
		});
		this.connection.addEventListener('negotiationneeded', async (event) => {
			await this.renegotiate();
			AirwaveLoggerGlobal.info('negotiation needed');
		});
		this.createEmptyDatachannelForICEUfrag();
		this.signalingChannel = new SignalingChannel(signalingUrl + '/publish');
	}

	connect(userID: string) {
		this.signalingChannel.connect(userID);
		this.createOffer();
		if (this.iceCandidates) {
			this.iceCandidates.forEach((candidate) =>
				this.signalingChannel.sendIceCandidate(candidate)
			);
		}
		this.connected = true;
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

	private createEmptyDatachannelForICEUfrag() {
		this.connection.createDataChannel('ice-ufrag-hack');
	}

	private async renegotiate() {
		if (!this.initialAnswerReceived) {
			this.waitingForAnswerToSendNextOffer = true;
		} else {
			await this.createOffer();
		}
	}

	private createStreamDescriptions() {
		const descriptions: Record<string, StreamDescription> = {};
		for (let [contentType, stream] of Array.from(
			this.streamByContentType.entries()
		)) {
			const streamID = stream.id;
			descriptions[streamID] = {
				contentType: contentType,
			};
		}
		return descriptions;
	}

	private async createOffer() {
		const offer = await this.connection.createOffer();
		await this.connection.setLocalDescription(offer);

		this.signalingChannel.sendOffer({
			sdp: offer,
			streamDescriptions: this.createStreamDescriptions(),
		});
		this.initialOfferSent = true;

		AirwaveLoggerGlobal.checkpoint(
			'createOffer',
			'Creating and sending initial offer'
		);

		const listener = this.signalingChannel.onSdp((answer) => {
			AirwaveLoggerGlobal.checkpoint('receiveAnswer', 'Received answer');

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
