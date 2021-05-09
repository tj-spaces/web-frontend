/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {Mic, MicOff, Videocam, VideocamOff} from '@material-ui/icons';
import {useContext} from 'react';
import BaseButton from '../base/BaseButton';
import UserSettingsContext from './userSettings/UserSettingsContext';

export default function DeviceControlButtons() {
	const {userSettingsSDK, userSettings} = useContext(UserSettingsContext);
	return (
		<>
			{!userSettings.micEnabled ? (
				<BaseButton onClick={() => userSettingsSDK.setMicEnabled(true)}>
					<MicOff />
				</BaseButton>
			) : (
				<BaseButton onClick={() => userSettingsSDK.setMicEnabled(false)}>
					<Mic />
				</BaseButton>
			)}

			{userSettings.cameraEnabled ? (
				<BaseButton onClick={() => userSettingsSDK.setCameraEnabled(false)}>
					<Videocam />
				</BaseButton>
			) : (
				<BaseButton onClick={() => userSettingsSDK.setCameraEnabled(true)}>
					<VideocamOff />
				</BaseButton>
			)}
		</>
	);
}
