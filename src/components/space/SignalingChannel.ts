import {SubscriptionRequestTarget} from './VoiceDownstream';

type SdpHandler = (answer: RTCSessionDescriptionInit) => void;
type IceCandidateHandler = (candidate: RTCIceCandidate) => void;
type SubscriptionResponseListenerWithTarget = {
	target: SubscriptionRequestTarget;
	handler: SubscriptionResponseHandler;
};
type SubscriptionResponse =
	| {
			status: 'available';
			streamID: string;
	  }
	| {
			status: 'unavailable';
	  };

type SubscriptionResponseHandler = (response: SubscriptionResponse) => void;
type SubscribeOfferHandler = (offerTarget: SubscriptionRequestTarget) => void;

export const PING_TIMEOUT = 60 * 1000;
export const PING_INTERVAL = 15 * 1000;

export type ContentType = 'userAudio' | 'userVideo' | 'screenVideo';

export default class SignalingChannel {
	private websocket: WebSocket;
	private messageQueue: [string, any][] = [];
	private sdpHandlers = new Set<SdpHandler>();
	private iceCandidateHandlers = new Set<IceCandidateHandler>();
	private subscriptionResponseHandlers = new Set<SubscriptionResponseListenerWithTarget>();
	private ackHandlers = new Map<string, Function>();
	private timeoutHandlers = new Set<Function>();
	private offeredSubscriptionHandlers = new Set<SubscribeOfferHandler>();
	private revokedSubscriptionHandlers = new Map<
		SubscriptionRequestTarget,
		Set<Function>
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

			case 'rtc_subscribe_offer':
				this.offeredSubscriptionHandlers.forEach((handler) =>
					handler(eventData)
				);
				break;

			case 'rtc_subscription_revoked':
				this.revokedSubscriptionHandlers
					.get(eventData)
					?.forEach((handler) => handler());
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

	onSubscribeResponse(
		userID: string,
		contentType: ContentType | 'userVideo' | 'screenVideo',
		handler: SubscriptionResponseHandler
	) {
		const value = {
			handler,
			target: {
				userID,
				contentType,
			},
		};

		this.subscriptionResponseHandlers.add(value);

		return {
			remove: () => {
				this.subscriptionResponseHandlers.delete(value);
			},
		};
	}

	onSubscriptionRevoked(target: SubscriptionRequestTarget, fn: Function) {
		if (!this.revokedSubscriptionHandlers.has(target)) {
			this.revokedSubscriptionHandlers.set(target, new Set());
		}
		this.revokedSubscriptionHandlers.get(target)!.add(fn);
	}

	sendSubscribeRequest(target: SubscriptionRequestTarget) {
		this._send('rtc_subscribe_request', target);
	}

	sendUnsubscribeRequest(target: SubscriptionRequestTarget) {
		this._send('rtc_unsubscribe_request', target);
	}

	onOfferedSubscription(fn: (target: SubscriptionRequestTarget) => void) {
		this.offeredSubscriptionHandlers.add(fn);

		return {
			remove: () => this.offeredSubscriptionHandlers.delete(fn),
		};
	}

	declineStreamOffer(target: SubscriptionRequestTarget) {
		this._send('rtc_subscribe_offer_decline', target);
	}
}
