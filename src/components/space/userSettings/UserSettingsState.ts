import {Record} from 'immutable';

export type UserSettingsStateProps = {
	cameraEnabled: boolean;
	micEnabled: boolean;
};

export default class UserSettingsState extends Record<UserSettingsStateProps>({
	cameraEnabled: false,
	micEnabled: false,
}) {}
