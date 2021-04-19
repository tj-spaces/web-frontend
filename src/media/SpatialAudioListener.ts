/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useContext, useEffect} from 'react';
import SpaceMediaContext from '../components/space/SpaceMediaContext';
import {Position} from '../typings/Space';

export default function SpatialAudioListener({
	position,
	rotation,
}: {
	position: Position;
	rotation: number;
}) {
	const {audioContext} = useContext(SpaceMediaContext);
	const listener = audioContext?.listener;

	useEffect(() => {
		if (listener) {
			listener.positionX.value = position.x;
			listener.positionZ.value = position.z;

			listener.forwardZ.value = Math.sin(rotation);
			listener.forwardX.value = Math.cos(rotation);
		}
	}, [listener, position, rotation]);

	return null;
}
