type SdpListener = (answer: RTCSessionDescriptionInit) => void;
type IceCandidateListener = (candidate: RTCIceCandidate) => void;

export default class SignalingChannel {
	private websocket: WebSocket;
	private messageQueue: [string, any][] = [];
	private sdpListeners = new Set<SdpListener>();
	private iceCandidateListeners = new Set<IceCandidateListener>();

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
				this.iceCandidateListeners.forEach((listener) => listener(eventData));
				break;
			case 'rtc_offer':
			case 'rtc_answer':
				this.sdpListeners.forEach((listener) => listener(eventData));
		}
	}

	private _send(eventName: string, eventData: any) {
		if (this.websocket.readyState !== WebSocket.OPEN) {
			this.messageQueue.push([eventName, eventData]);
		} else {
			this.websocket.send(JSON.stringify({event: eventName, data: eventData}));
		}
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

	onIceCandidate(fn: IceCandidateListener) {
		this.iceCandidateListeners.add(fn);
		return {
			remove: () => this.iceCandidateListeners.delete(fn),
		};
	}

	onSdp(fn: SdpListener) {
		this.sdpListeners.add(fn);
		return {
			remove: () => this.sdpListeners.delete(fn),
		};
	}
}
