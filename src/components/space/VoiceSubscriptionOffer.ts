import {SubscriptionTarget} from './VoiceDownstream';

export default class VoiceSubscriptionOffer {
	private invalidatedHandlers = new Set<Function>();

	constructor(private target: SubscriptionTarget) {}

	ifInvalidated(fn: Function) {
		this.invalidatedHandlers.add(fn);

		return {
			remove: () => this.invalidatedHandlers.delete(fn),
		};
	}
}
