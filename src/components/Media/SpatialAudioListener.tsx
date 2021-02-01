import { useContext, useEffect } from 'react';
import { SpacePositionInfo } from '../../typings/SpaceParticipant';
import SpaceAudioContext from '../Space/SpaceAudioContext';

export default function SpatialAudioListener({ position }: { position: SpacePositionInfo }) {
	const { listener } = useContext(SpaceAudioContext);
	const { location, rotation } = position;

	useEffect(() => {
		listener.positionX.value = location.x;
		listener.positionZ.value = location.y;

		listener.forwardZ.value = Math.sin(rotation);
		listener.forwardX.value = Math.cos(rotation);
	}, [listener, location, rotation]);

	return null;
}
