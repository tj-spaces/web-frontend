import {ContentType} from './SignalingChannel';

export default class VoiceSubscription {
	private unsubscribed = false;
	constructor(
		private userId: string,
		private contentType: ContentType,
		private onUnsubscribeRequested: () => void
	) {}

	getUserID() {
		return this.userId;
	}

	getContentType() {
		return this.contentType;
	}

	unsubscribe() {
		if (!this.unsubscribed) {
			this.onUnsubscribeRequested();
			this.unsubscribed = true;
		}
	}
}
