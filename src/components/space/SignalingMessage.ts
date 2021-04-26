export default class SignalingMessage<P> {
	constructor(private header: string, private payload?: P) {}

	getHeader() {
		return this.header;
	}

	getPayload() {
		return this.payload;
	}
}

type RTCIceCandidatePayload = {
	candidate: RTCIceCandidateInit;
};

type SignalingEventType = 'rtc_icecandidate';

export function convertWebsocketMessageToSignalingMessage(
	event: 'auth' | 'rtc_offer' | 'rtc_answer' | SignalingEventType,
	data?: string
) {
	switch (event) {
		case 'auth':
			return new SignalingMessage('auth');
		case 'rtc_icecandidate':
			return new SignalingMessage<RTCIceCandidatePayload>('rtc_icecandidate', {
				candidate: JSON.parse(data!),
			});
		case 'rtc_offer':
			return new SignalingMessage<{offer: RTCSessionDescriptionInit}>(
				'rtc_offer',
				{offer: JSON.parse(data!)}
			);
		case 'rtc_answer':
			return new SignalingMessage<{answer: RTCSessionDescriptionInit}>(
				'rtc_answer',
				{answer: JSON.parse(data!)}
			);
	}
}
