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
			position={[position.x, position.y + 1, position.z]}
			rotation={[0, rotation, 0]}
		>
			<planeBufferGeometry
				attach="geometry"
				parameters={{width: 1, height: 1, widthSegments: 1, heightSegments: 1}}
			/>
			<meshLambertMaterial
				attach="material"
				color={me ? '#ff6666' : '#66ff66'}
			/>
		</mesh>
	);
}
