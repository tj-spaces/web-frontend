import VoiceEndpointState from './VoiceEndpointState';
import VoiceSDK from './VoiceSDK';

export type VoiceEndpointStateListener = (state: VoiceEndpointState) => void;

export default class VoiceEndpoint {
	websocket: WebSocket;

	private listeners = new Set<VoiceEndpointStateListener>();
	private peer: RTCPeerConnection;
	private _state = new VoiceEndpointState();

	private set state(newValue: VoiceEndpointState) {
		this._state = newValue;
		this.emitChange();
	}

	private get state() {
		return this._state;
	}

	private emitChange() {
		this.listeners.forEach((listener) => listener(this.state));
	}

	addListener(listener: VoiceEndpointStateListener) {
		this.listeners.add(listener);
		return {
			remove: () => {
				this.listeners.delete(listener);
			},
		};
	}

	constructor(
		public readonly entrypointUrl: string,
		private voiceSDK: VoiceSDK
	) {
		this.websocket = new WebSocket(entrypointUrl);
		this.websocket.onopen = () => {
			this.state = this.state.setSignalingConnectionState('OPEN');
		};
		this.websocket.onclose = () => {
			this.state = this.state.setSignalingConnectionState('CLOSED');
		};
		this.websocket.onmessage = (ev) => this.processSignalingMessage(ev);

		this.peer = new RTCPeerConnection();
		this.peer.addEventListener('track', (ev) => this.processAddTrackEvent(ev));
		this.peer.addEventListener('icecandidate', (ev) =>
			this.processIceCandidate(ev)
		);
	}

	private sendMessage = (event: string, data: string) => {
		this.websocket.send(JSON.stringify({event, data}));
	};

	/**
	 * Parses the event data as JSON, and processes it.
	 * @param event The native event.
	 */
	private processSignalingMessage(event: MessageEvent<string>) {
		try {
			let message = JSON.parse(event.data);

			switch (message.event) {
				case 'offer':
					this.peer.setRemoteDescription(JSON.parse(message.data));
					this.peer.createAnswer().then((answer) => {
						this.peer.setLocalDescription(answer);
						this.sendMessage('answer', JSON.stringify(answer));
					});
					break;

				case 'candidate':
					this.peer.addIceCandidate(JSON.parse(message.data));
					break;
			}
		} catch (error) {
			console.error({
				event: 'parse_websocket_message',
				error,
				data: event.data,
			});
		}
	}

	/**
	 * When the client gets an ICE server candidate (from the browser),
	 * it sends the candidate to the Voice server.
	 * @param event The native event
	 */
	private processIceCandidate(event: RTCPeerConnectionIceEvent) {
		if (event.candidate) {
			this.sendMessage('candidate', JSON.stringify(event.candidate));
		}
	}

	/**
	 * Handles a new track received from the Voice endpoint.
	 * @param event The native event
	 */
	private processAddTrackEvent(event: RTCTrackEvent) {
		let stream = event.streams[0];
		let userID = stream.id.slice('user_'.length);
		this.voiceSDK.addStreamToUser(userID, stream);
		this.voiceSDK.addTrack(event.track);
		this.voiceSDK.addTrackIDToUser(userID, event.track.id);
	}
}
