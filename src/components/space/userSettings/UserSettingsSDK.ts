import SDKBase from '../../../lib/SDKBase';
import UserSettingsState from './UserSettingsState';

export default class UserSettingsSDK extends SDKBase<UserSettingsState> {
	getInitialState() {
		return new UserSettingsState();
	}

	setCameraEnabled(enabled: boolean) {
		this.state = this.state.set('cameraEnabled', enabled);
	}

	setMicEnabled(enabled: boolean) {
		this.state = this.state.set('micEnabled', enabled);
	}
}
