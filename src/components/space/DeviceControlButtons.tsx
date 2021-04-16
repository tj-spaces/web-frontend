/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import BaseButton from '../base/BaseButton';

export default function DeviceControlButtons({
	cameraEnabled,
	setCameraEnabled,
	micEnabled,
	setMicEnabled,
}: {
	cameraEnabled: boolean;
	setCameraEnabled(enabled: boolean): void;
	micEnabled: boolean;
	setMicEnabled(enabled: boolean): void;
}) {
	return (
		<>
			{!micEnabled ? (
				<BaseButton onClick={() => setMicEnabled(true)}>
					<i className="fas fa-microphone-slash"></i>
				</BaseButton>
			) : (
				<BaseButton onClick={() => setMicEnabled(false)}>
					<i className="fas fa-microphone"></i>
				</BaseButton>
			)}

			{cameraEnabled ? (
				<BaseButton onClick={() => setCameraEnabled(false)}>
					<i className="fas fa-video"></i>
				</BaseButton>
			) : (
				<BaseButton onClick={() => setCameraEnabled(true)}>
					<i className="fas fa-video-slash"></i>
				</BaseButton>
			)}
		</>
	);
}
