import {useContext, useEffect} from 'react';
import SpaceAudioContext from '../components/space/SpaceAudioContext';
import {Position} from '../typings/Space';

export default function SpatialAudioListener({
	position,
	rotation,
}: {
	position: Position;
	rotation: number;
}) {
	const {listener} = useContext(SpaceAudioContext);

	useEffect(() => {
		listener.positionX.value = position.x;
		listener.positionZ.value = position.z;

		listener.forwardZ.value = Math.sin(rotation);
		listener.forwardX.value = Math.cos(rotation);
	}, [listener, position, rotation]);

	return null;
}
