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
	rotation,
	me,
	id,
}: {
	position: Position;
	rotation: number;
	me: boolean;
	id: string;
}) {
	const {camera} = useThree();

	useEffect(() => {
		if (me) {
			camera.position.set(position.x, position.y + 2, position.z);
		}
	}, [camera, camera.position, me, position]);

	return (
		<mesh
			position={[position.x, position.y + 2, position.z]}
			// Vertical rotations must be made along the Z axis, because we rotate by pi/2 on the X axis.
			rotation={[Math.PI / 2, 0, rotation ?? 0]}
		>
			<cylinderBufferGeometry attach="geometry" args={[0.5, 0.5, 0.125, 64]} />
			<meshLambertMaterial
				attach="material"
				color={me ? '#ff6666' : '#66ff66'}
			/>
		</mesh>
	);
}
