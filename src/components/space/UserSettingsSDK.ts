import UserSettingsState from './UserSettingsState';

type UserSettingsStateListener = (state: UserSettingsState) => void;

export default class UserSettingsSDK {
	private listeners = new Set<UserSettingsStateListener>();
	private _state = new UserSettingsState();

	private set state(newValue: UserSettingsState) {
		this._state = newValue;
		this.emitChange();
	}

	private get state() {
		return this._state;
	}

	private emitChange() {
		this.listeners.forEach((listener) => listener(this.state));
	}

	addListener(listener: UserSettingsStateListener) {
		this.listeners.add(listener);
		return {
			remove: () => {
				this.listeners.delete(listener);
			},
		};
	}

	setCameraEnabled(enabled: boolean) {
		this.state = this.state.set('cameraEnabled', enabled);
	}

	setMicEnabled(enabled: boolean) {
		this.state = this.state.set('micEnabled', enabled);
	}
}
