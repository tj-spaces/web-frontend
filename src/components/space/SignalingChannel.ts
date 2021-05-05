import AirwaveLoggerGlobal from './AirwaveLogger';
import {SubscriptionDescriptor, SubscriptionState} from './VoiceDownstream';

export const PING_TIMEOUT = 60 * 1000;
export const PING_INTERVAL = 15 * 1000;

export type SdpHandler = (answer: RTCSessionDescriptionInit) => void;
export type IceCandidateHandler = (candidate: RTCIceCandidate) => void;
export type SubscriptionStateListener = (newState: SubscriptionState) => void;

export type StreamDescription = {
	contentType: 'user' | 'screen';
};

export default class SignalingChannel {
	private websocket: WebSocket | null = null;
	private messageQueue: [string, any][] = [];
	private sdpHandlers = new Set<SdpHandler>();
	private iceCandidateHandlers = new Set<IceCandidateHandler>();
	private ackHandlers = new Map<string, Function>();
	private timeoutHandlers = new Set<Function>();
	private streamSubscriptionStateListeners = new Map<
		string,
		Set<SubscriptionStateListener>
	>();

	constructor(private url: string) {}

	connect(userID: string) {
		this.websocket = new WebSocket(this.url);
		this.websocket.onopen = () => {
			this._send('hello', userID);
		};
		this.websocket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			this._handleMessage(message.event, message.data);
		};
		this.websocket.onerror = (event) => {
			AirwaveLoggerGlobal.error(
				'Error when connecting to Websocket: [unknown]. Readystate: %p, SignalingURL: %p',
				this.websocket!.readyState,
				this.url
			);
		};
	}

	private _handleMessage(eventName: string, eventData: any) {
		switch (eventName) {
			case 'rtc_candidate': {
				const candidate = new RTCIceCandidate(JSON.parse(eventData));
				this.iceCandidateHandlers.forEach((listener) => listener(candidate));
				break;
			}

			case 'rtc_offer':
			case 'rtc_answer': {
				const sdp = new RTCSessionDescription(JSON.parse(eventData));
				const handlers = this.sdpHandlers;
				if (handlers.size === 0) {
					AirwaveLoggerGlobal.warn('No handlers registered to handle SDP');
				}
				this.sdpHandlers.forEach((listener) => listener(sdp));
				break;
			}

			case 'subscription_update': {
				const {streamID, constraints}: SubscriptionDescriptor = eventData;

				const listeners = this.streamSubscriptionStateListeners.get(streamID);
				if (listeners) {
					listeners.forEach((listener) => listener(constraints));
				}
				break;
			}

			case 'hello': {
				this.messageQueue.forEach(([eventName, eventData]) => {
					this._send(eventName, eventData);
				});
				this.messageQueue = [];
				break;
			}
			case 'goodbye':
				AirwaveLoggerGlobal.mustfix('Received goodbye message');
				break;

			default:
				AirwaveLoggerGlobal.mustfix(
					'Received unusual eventName: %p',
					eventName
				);
		}
	}

	private async _sendPing() {
		const result = await Promise.race([
			new Promise<'success'>((resolve) =>
				this._send('ping').then(() => resolve('success'))
			),
			new Promise<'timeout'>((resolve) =>
				setTimeout(() => resolve('timeout'), PING_TIMEOUT)
			),
		]);

		if (result === 'success') {
			setTimeout(() => this._sendPing(), PING_INTERVAL);
		} else {
			this.timeoutHandlers.forEach((handler) => handler());
		}
	}

	private _send(event: string, data?: any) {
		return new Promise<{event: string; data?: any}>((resolve, reject) => {
			if (
				this.websocket == null ||
				this.websocket.readyState !== WebSocket.OPEN
			) {
				this.messageQueue.push([event, data]);
			} else {
				const onTimeout = () => reject('timeout');
				const nonce = Math.random().toString(36).slice(2);
				this.websocket.send(
					JSON.stringify({
						nonce,
						event,
						data: typeof data === 'string' ? data : JSON.stringify(data),
					})
				);
				this.ackHandlers.set(nonce, (event: string, data?: any) => {
					this.timeoutHandlers.delete(onTimeout);
					resolve({event, data});
				});
				this.timeoutHandlers.add(onTimeout);
			}
		});
	}

	sendOffer(offer: {
		sdp: RTCSessionDescriptionInit;
		streamDescriptions: {[streamID: string]: StreamDescription};
	}) {
		this._send('rtc_offer', offer);
	}

	sendAnswer(answer: RTCSessionDescriptionInit) {
		this._send('rtc_answer', answer);
	}

	sendIceCandidate(candidate: RTCIceCandidateInit) {
		this._send('rtc_ice_candidate', candidate);
	}

	private serializeSubscriptionUpdate(
		streamID: string,
		constraints: SubscriptionState
	) {
		return `${streamID} ${(['audio', 'video'] as const)
			.filter((val) => !!constraints[val])
			.join(',')}`;
	}

	sendSubscriptionUpdate(streamID: string, constraints: SubscriptionState) {
		this._send(
			'subscription_update_request',
			this.serializeSubscriptionUpdate(streamID, constraints)
		);
	}

	sendCloseAllSubscriptions() {
		this._send('rtc_close_connection', '');
	}

	sendHelloMessage(userID: string, role: 'publisher' | 'subscriber') {
		this._send('hello', `${userID}:${role}`);
	}

	onIceCandidate(fn: IceCandidateHandler) {
		this.iceCandidateHandlers.add(fn);
		return {
			remove: () => this.iceCandidateHandlers.delete(fn),
		};
	}

	onSdp(fn: SdpHandler) {
		this.sdpHandlers.add(fn);
		return {
			remove: () => this.sdpHandlers.delete(fn),
		};
	}

	onSubscriptionUpdated(streamID: string, handler: SubscriptionStateListener) {
		if (!this.streamSubscriptionStateListeners.has(streamID)) {
			this.streamSubscriptionStateListeners.set(streamID, new Set([handler]));
		} else {
			this.streamSubscriptionStateListeners.get(streamID)!.add(handler);
			return {
				remove: () => {
					this.streamSubscriptionStateListeners.get(streamID)?.delete(handler);
				},
			};
		}
	}
}
