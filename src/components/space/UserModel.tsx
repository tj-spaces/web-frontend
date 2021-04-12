/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useContext, useEffect, useState} from 'react';
import {useThree} from 'react-three-fiber';
import * as THREE from 'three';
import {useTracks} from '../../mediautil/MediaConnector';
import {Position} from '../../typings/Space';
import SpaceVoiceContext from './VoiceContext';

export default function UserModel({
	position,
	rotation = 0,
	me,
	id,
}: {
	position: Position;
	rotation: number;
	me: boolean;
	id: string;
}) {
	const {camera} = useThree();
	const [videoElement] = useState(() => document.createElement('video'));
	const voiceServer = useContext(SpaceVoiceContext);
	const allTracks = useTracks(voiceServer, id);
	const videoTracks = (allTracks ?? []).filter(
		(track) => track.kind === 'video'
	);

	useEffect(() => {
		if (me) {
			let offset = {
				x: Math.sin(rotation),
				z: Math.cos(rotation),
			};
			camera.position.set(
				position.x + offset.x * 2,
				position.y + 4,
				position.z + offset.z * 6
			);
			camera.rotation.set(-Math.PI / 8, rotation, 0);
		}
	}, [camera, camera.position, me, position, rotation]);

	useEffect(() => {
		if (videoElement) {
			if (videoTracks.length > 0) {
				videoElement.srcObject = new MediaStream(videoTracks);
			}
		}
	}, [allTracks, videoElement, videoTracks]);

	return (
		<mesh
			position={[position.x, position.y + 2, position.z]}
			// Vertical rotations must be made along the Z axis, because we rotate by pi/2 on the X axis.
			rotation={[0, 0, rotation ?? 0]}
		>
			{/* <cylinderBufferGeometry attach="geometry" args={[0.5, 0.5, 0.125, 64]} /> */}
			<planeBufferGeometry attach="geometry" args={[1, 1]} />
			<meshBasicMaterial
				attach="material"
				color={me ? '#ff6666' : '#66ff66'}
				side={THREE.DoubleSide}
			>
				<videoTexture attach="map" args={[videoElement]} />
			</meshBasicMaterial>
		</mesh>
	);
}
