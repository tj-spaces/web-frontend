import {USE_VOICE_SERVER_SSL} from '../../lib/constants';
import VoiceEndpointState from './VoiceEndpointState';
import VoiceSDK from './VoiceSDK';

export type VoiceEndpointStateListener = (state: VoiceEndpointState) => void;

export default class VoiceEndpoint {
	websocket: WebSocket;

	public readonly endpointUrl: string;
	private listeners = new Set<VoiceEndpointStateListener>();
	private publisher: RTCPeerConnection;
	private subscriber: RTCPeerConnection;
	private _spaceId: string | null = null;
	private _state = new VoiceEndpointState();
	// Queue for messages that want to be sent before the websocket is opened
	private _mq: {event: string; data: string}[] = [];
	// If we add a track before we receive and answer from the voice endpoint and need to
	// renegotiate, wait for their answer. If this is set to true, then when we receive the
	// answer, we'll send a new offer.
	private _negotiationNeededAfterAnswer = false;

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

	constructor(url: string, private voiceSDK: VoiceSDK) {
		const wssRegex = /^wss?:\/\//;
		if (!wssRegex.test(url)) {
			url = (USE_VOICE_SERVER_SSL ? 'wss://' : 'ws://') + url + '/websocket';
		}
		this.endpointUrl = url;
		this.websocket = new WebSocket(url);
		this.websocket.onopen = () => {
			this.state = this.state.setSignalingConnectionState('OPEN');
			this._mq.forEach((message) =>
				this.websocket.send(JSON.stringify(message))
			);
		};
		this.websocket.onclose = () => {
			this.state = this.state.setSignalingConnectionState('CLOSED');
		};
		this.websocket.onmessage = (ev) => this.processSignalingMessage(ev);

		this.subscriber = new RTCPeerConnection();
		this.subscriber.addEventListener('track', (ev) =>
			this.processAddTrackEvent(ev)
		);
		this.subscriber.addEventListener('icecandidate', (ev) => {
			this.sendMessage(
				'rtc_subscriber_ice_candidate',
				JSON.stringify(ev.candidate)
			);
		});

		this.publisher = new RTCPeerConnection();
		this.publisher.addEventListener('negotiationneeded', () => {
			console.log({event: 'negotiationNeeded'});
			this.onNegotiationNeeded();
		});
	}

	/**
	 * The server will create all the offers, because the session description will probably
	 * change more frequently for the many people surrounding a user than the user themself.
	 */
	private async onNegotiationNeeded() {
		const offer = await this.publisher.createOffer();
		if (this.publisher.signalingState !== 'stable') {
			this._negotiationNeededAfterAnswer = true;
			return;
		}
		this._negotiationNeededAfterAnswer = false;
		this.publisher.setLocalDescription(offer);
		this.sendMessage('offer', JSON.stringify(offer));
	}

	private sendMessage = (event: string, data: string) => {
		if (this.websocket.readyState !== this.websocket.OPEN) {
			this._mq.push({event, data});
		} else {
			this.websocket.send(JSON.stringify({event, data}));
		}
	};

	/**
	 * Parses the event data as JSON, and processes it.
	 * @param event The native event.
	 */
	private processSignalingMessage(event: MessageEvent<string>) {
		try {
			let message = JSON.parse(event.data);

			switch (message.event) {
				case 'auth':
					if (this._spaceId) {
						this.sendMessage('join_room', this._spaceId);
					}
					break;

				case 'rtc_subscriber_offer':
					this.subscriber.setRemoteDescription(JSON.parse(message.data));
					this.subscriber.createAnswer().then((answer) => {
						this.subscriber.setLocalDescription(answer);
						this.sendMessage('answer', JSON.stringify(answer));
					});
					break;

				case 'rtc_subscriber_candidate':
					this.subscriber.addIceCandidate(JSON.parse(message.data));
					break;

				case 'rtc_publisher_candidate':
					this.publisher.addIceCandidate(JSON.parse(message.data));
					break;

				case 'rtc_publisher_answer':
					this.publisher.setRemoteDescription(JSON.parse(message.data));
					if (this._negotiationNeededAfterAnswer) {
						this.onNegotiationNeeded();
						this._negotiationNeededAfterAnswer = false;
					}
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
		stream.addEventListener('removetrack', (event) => {
			console.info({event: 'removeTrack', userID, track: event.track});
			this.voiceSDK.removeTrackIDFromUser(userID, event.track.id);
			this.voiceSDK.removeTrack(event.track);
		});
	}

	addLocalTrack(track: MediaStreamTrack, stream: MediaStream) {
		if (!this.state.localTracks.has(track.id)) {
			console.log({event: 'addLocalTrack', track, stream});
			const sender = this.publisher.addTrack(track, stream);
			this.state = this.state.set(
				'localTracks',
				this.state.localTracks.set(track.id, sender)
			);
		}
	}

	removeLocalTrack(track: MediaStreamTrack) {
		if (this.state.localTracks.has(track.id)) {
			console.log({event: 'removeLocalTrack', track});
			const sender = this.state.localTracks.get(track.id)!;
			if (sender) {
				this.publisher.removeTrack(sender);
				this.state = this.state.set(
					'localTracks',
					this.state.localTracks.delete(track.id)
				);
			}
		}
	}

	joinSpace(spaceId: string, userId: string) {
		this._spaceId = spaceId;
		console.log({event: 'joinSpace', spaceId});
		this.sendMessage('auth', userId);
	}

	leaveSpace() {
		console.log({event: 'leaveSpace'});
		this.sendMessage('leave_room', '');
	}

	close() {
		this.websocket.close();
		this.publisher.close();
		this.subscriber.close();
	}
}
