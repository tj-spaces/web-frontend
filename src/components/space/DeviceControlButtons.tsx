/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useContext} from 'react';
import BaseButton from '../base/BaseButton';
import SpaceMediaContext from './SpaceMediaContext';

export default function DeviceControlButtons() {
	const {localDevicesSDK, localDevices} = useContext(SpaceMediaContext);
	return (
		<>
			{!localDevices.micEnabled ? (
				<BaseButton onClick={() => localDevicesSDK.setMicEnabled(true)}>
					<i className="fas fa-microphone-slash"></i>
				</BaseButton>
			) : (
				<BaseButton onClick={() => localDevicesSDK.setMicEnabled(false)}>
					<i className="fas fa-microphone"></i>
				</BaseButton>
			)}

			{localDevices.cameraEnabled ? (
				<BaseButton onClick={() => localDevicesSDK.setCameraEnabled(false)}>
					<i className="fas fa-video"></i>
				</BaseButton>
			) : (
				<BaseButton onClick={() => localDevicesSDK.setCameraEnabled(true)}>
					<i className="fas fa-video-slash"></i>
				</BaseButton>
			)}
		</>
	);
}
