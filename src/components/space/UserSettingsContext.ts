import {createContext} from 'react';
import UserSettingsSDK from './UserSettingsSDK';
import UserSettingsState from './UserSettingsState';

export type UserSettingsContextProps = {
	userSettings: UserSettingsState;
	userSettingsSDK: UserSettingsSDK;
};

const UserSettingsContext = createContext<UserSettingsContextProps>({
	userSettings: new UserSettingsState(),
	userSettingsSDK: null!,
});

export default UserSettingsContext;
