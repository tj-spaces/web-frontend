/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useEffect} from 'react';
import {useThree} from 'react-three-fiber';
import {Position} from '../../typings/Space';

export default function UserModel({
	position,
	me,
	id,
}: {
	position: Position;
	me: boolean;
	id: string;
}) {
	const {camera} = useThree();

	useEffect(() => {
		camera.position.set(position.x, position.y + 2, position.z);
	}, [camera, camera.position, position]);

	return (
		<mesh position={[position.x, position.y + 1, position.z]}>
			<boxBufferGeometry attach="geometry" args={[1, 2, 0.5]} />
			<meshLambertMaterial
				attach="material"
				color={me ? '#ff6666' : '#66ff66'}
			/>
		</mesh>
	);
}
