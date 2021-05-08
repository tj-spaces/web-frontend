/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useContext} from 'react';
import BaseButton from '../base/BaseButton';
import UserSettingsContext from './userSettings/UserSettingsContext';

export default function DeviceControlButtons() {
	const {userSettingsSDK, userSettings} = useContext(UserSettingsContext);
	return (
		<>
			{!userSettings.micEnabled ? (
				<BaseButton onClick={() => userSettingsSDK.setMicEnabled(true)}>
					<i className="fas fa-microphone-slash"></i>
				</BaseButton>
			) : (
				<BaseButton onClick={() => userSettingsSDK.setMicEnabled(false)}>
					<i className="fas fa-microphone"></i>
				</BaseButton>
			)}

			{userSettings.cameraEnabled ? (
				<BaseButton onClick={() => userSettingsSDK.setCameraEnabled(false)}>
					<i className="fas fa-video"></i>
				</BaseButton>
			) : (
				<BaseButton onClick={() => userSettingsSDK.setCameraEnabled(true)}>
					<i className="fas fa-video-slash"></i>
				</BaseButton>
			)}
		</>
	);
}
