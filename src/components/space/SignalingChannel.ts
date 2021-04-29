import AirwaveLoggerGlobal from './AirwaveLogger';
import {SubscriptionDescriptor, SubscriptionState} from './VoiceDownstream';

export const PING_TIMEOUT = 60 * 1000;
export const PING_INTERVAL = 15 * 1000;

export type SdpHandler = (answer: RTCSessionDescriptionInit) => void;
export type IceCandidateHandler = (candidate: RTCIceCandidate) => void;
export type SubscriptionStateListener = (newState: SubscriptionState) => void;

export default class SignalingChannel {
	private websocket: WebSocket;
	private messageQueue: [string, any][] = [];
	private sdpHandlers = new Set<SdpHandler>();
	private iceCandidateHandlers = new Set<IceCandidateHandler>();
	private ackHandlers = new Map<string, Function>();
	private timeoutHandlers = new Set<Function>();
	private streamSubscriptionStateListeners = new Map<
		string,
		Set<SubscriptionStateListener>
	>();

	constructor(signalingUrl: string) {
		this.websocket = new WebSocket(signalingUrl);
		this.websocket.onopen = () => {
			this.messageQueue.forEach(([eventName, eventData]) => {
				this._send(eventName, eventData);
			});
			this.messageQueue = [];
		};
		this.websocket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			this._handleMessage(message.event, message.data);
		};
		this.websocket.onerror = (event) => {
			AirwaveLoggerGlobal.error(
				'Error when connecting to Websocket: [unknown]. Readystate: %p, SignalingURL: %p',
				this.websocket.readyState,
				signalingUrl
			);
		};
	}

	private _handleMessage(eventName: string, eventData: any) {
		switch (eventName) {
			case 'rtc_ice_candidate':
				this.iceCandidateHandlers.forEach((listener) => listener(eventData));
				break;

			case 'rtc_offer':
			case 'rtc_answer':
				this.sdpHandlers.forEach((listener) => listener(eventData));
				break;

			case 'rtc_subscription_update': {
				const {streamID, constraints}: SubscriptionDescriptor = eventData;

				const listeners = this.streamSubscriptionStateListeners.get(streamID);
				if (listeners) {
					listeners.forEach((listener) => listener(constraints));
				}
				break;
			}
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
			if (this.websocket.readyState !== WebSocket.OPEN) {
				this.messageQueue.push([event, data]);
			} else {
				const onTimeout = () => reject('timeout');
				const nonce = Math.random().toString(36).slice(2);
				this.websocket.send(JSON.stringify({nonce, event, data}));
				this.ackHandlers.set(nonce, (event: string, data?: any) => {
					this.timeoutHandlers.delete(onTimeout);
					resolve({event, data});
				});
				this.timeoutHandlers.add(onTimeout);
			}
		});
	}

	sendOffer(offer: RTCSessionDescriptionInit) {
		this._send('rtc_offer', offer);
	}

	sendAnswer(answer: RTCSessionDescriptionInit) {
		this._send('rtc_answer', answer);
	}

	sendIceCandidate(candidate: RTCIceCandidateInit) {
		this._send('rtc_ice_candidate', candidate);
	}

	sendSubscriptionUpdate(streamID: string, constraints: SubscriptionState) {
		this._send('rtc_subscription_update_request', {streamID, constraints});
	}

	sendCloseAllSubscriptions() {
		this._send('rtc_close_connection', '');
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
