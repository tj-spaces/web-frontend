import {VoiceServerLike} from '../../media/VoiceEndpoint';
import {VoiceState} from './VoiceState';

export type VoiceStateListener = (newState: VoiceState) => void;

export default class VoiceSDK {
	private listeners = new Set<VoiceStateListener>();
	private _state = new VoiceState();

	private set state(newValue: VoiceState) {
		this._state = newValue;
		this.emitChange();
	}

	private get state() {
		return this._state;
	}

	private emitChange() {
		this.listeners.forEach((listener) => listener(this.state));
	}

	addListener(listener: VoiceStateListener) {
		this.listeners.add(listener);
		return {
			remove: () => {
				this.listeners.delete(listener);
			},
		};
	}

	addVoiceEndpoint(endpointId: string, endpoint: VoiceServerLike) {
		this.state = this.state.addVoiceEndpoint(endpointId, endpoint);
	}

	removeVoiceEndpoint(endpointId: string) {
		this.state = this.state.removeVoiceEndpoint(endpointId);
	}
}
