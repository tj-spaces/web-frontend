/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import BaseButton from '../base/BaseButton';

export default function DeviceControlButtons() {
	let media = {muted: false, cameraEnabled: false} as any;

	return (
		<>
			{media.muted ? (
				<BaseButton onClick={() => media.setMuted(false)}>
					<i className="fas fa-microphone-slash"></i>
				</BaseButton>
			) : (
				<BaseButton onClick={() => media.setMuted(true)}>
					<i className="fas fa-microphone"></i>
				</BaseButton>
			)}

			{media.cameraEnabled ? (
				<BaseButton onClick={() => media.setCameraEnabled(false)}>
					<i className="fas fa-video"></i>
				</BaseButton>
			) : (
				<BaseButton onClick={() => media.setCameraEnabled(true)}>
					<i className="fas fa-video-slash"></i>
				</BaseButton>
			)}
		</>
	);
}