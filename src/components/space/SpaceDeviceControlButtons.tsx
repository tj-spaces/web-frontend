import React, {useContext} from 'react';
import BaseButton from '../base/BaseButton';
import SpaceMediaContext from './SpaceMediaContext';

export default function SpaceDeviceControlButtons() {
	const media = useContext(SpaceMediaContext);

	if (!media) return null;

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
