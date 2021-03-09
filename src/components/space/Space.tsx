/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {Suspense, useContext, useEffect} from 'react';
import {Canvas, useLoader} from 'react-three-fiber';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import useKeyboardState from '../../hooks/useKeyboardState';
import useMyID from '../../hooks/useMyID';
import useParticipants from '../../hooks/useParticipants';
import SpatialAudioListener from '../../mediautil/SpatialAudioListener';
import Floor from './Floor';
import SpaceManagerContext from './ManagerContext';
import RemoteAudio from './RemoteAudio';
import UserModel from './UserModel';

function SushiTable() {
	// Attribution: Aimi Sekiguchi
	// https://poly.google.com/user/c6UmSrlqUaJ/
	// TODO: Put attribution on page itself for actual release
	// (Only developers see it right now so the attribution is in the code)
	const table = useLoader(
		GLTFLoader,
		'https://nebulamodels.s3.amazonaws.com/models/sushi_table/model.gltf'
	);
	return (
		<primitive object={table.scene} scale={[2, 2, 2]} position={[0, -1.9, 0]} />
	);
}

export default function Space() {
	const manager = useContext(SpaceManagerContext);

	const myID = useMyID();
	const participants = useParticipants();

	const {a, s, d, w} = useKeyboardState(document.body);

	useEffect(() => {
		manager.setMoveDirection({
			x: a ? -1 : d ? 1 : 0,
			y: 0,
			z: s ? 1 : w ? -1 : 0,
		});
	}, [a, s, d, w, manager]);

	const myPosition = myID ? participants[myID]?.position : undefined;
	const {x, z} = myPosition ?? {x: 0, z: 0};

	return (
		<div style={{width: '100vw', height: '100vh'}}>
			<SpatialAudioListener
				position={myPosition ?? {x: 0, y: 0, z: 0}}
				rotation={0}
			/>
			{Object.entries(participants).map(([id, participant]) =>
				id !== myID ? (
					<RemoteAudio userID={id} position={participant.position} key={id} />
				) : null
			)}
			<Canvas camera={{position: [x, 10, z]}}>
				<Suspense fallback="Loading model">
					<SushiTable />
				</Suspense>
				<ambientLight intensity={0.5} />
				<Floor />
				{Object.entries(participants).map(([id, participant]) => (
					<UserModel
						position={participant.position}
						key={id}
						me={id === myID}
						id={id}
					/>
				))}
			</Canvas>
		</div>
	);
}
