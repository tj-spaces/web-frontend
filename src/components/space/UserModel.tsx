import React, {useEffect} from 'react';
import {useThree} from 'react-three-fiber';
import SpatialAudioListener from '../../mediautil/SpatialAudioListener';
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
		camera.position.set(position.x + 4, position.y + 2, position.z + 4);
		camera.lookAt(position.x, position.y, position.z);
	}, [camera, camera.position, position]);

	return (
		<>
			{me && <SpatialAudioListener position={position} rotation={0} />}
			<mesh position={[position.x, position.y + 1, position.z]}>
				<boxBufferGeometry attach="geometry" args={[1, 2, 0.5]} />
				<meshLambertMaterial
					attach="material"
					color={me ? '#ff6666' : '#66ff66'}
				/>
			</mesh>
		</>
	);
}
