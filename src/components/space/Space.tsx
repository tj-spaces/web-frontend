/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {PointerLockControls} from '@react-three/drei';
import {Suspense, useContext, useEffect, useRef, useState} from 'react';
import {Canvas, useLoader} from 'react-three-fiber';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import useKeyboardState from '../../hooks/useKeyboardState';
import SpatialAudioListener from '../../media/SpatialAudioListener';
import AuthContext from '../AuthContext';
import Floor from './Floor';
import PointOfViewContext from './PointOfViewContext';
import RemoteAudio from './RemoteAudio';
import {useMyAnonymousID, useParticipants} from './SimulationHooks';
import SimulationServerContext from './SimulationServerContext';
import SpaceAudioContext from './SpaceAudioContext';
import UserModel from './UserModel';
import VoiceContext from './VoiceContext';

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
	const {simulationSDK} = useContext(SimulationServerContext);

	const myID = useMyAnonymousID();
	const participants = useParticipants();

	const {a = false, s = false, d = false, w = false} = useKeyboardState(
		document.body
	);
	const rotation = useRef<number>(0);

	useEffect(() => {
		// A and D move left and right (-X and +X)
		// W and S move forward and backward (-Z and +Z)

		// Take this vector and rotate it by `rotation.current` degrees.

		let relativeX = -a + +d;
		let relativeZ = -s + +w;

		let dx =
			relativeX * Math.cos(rotation.current) -
			relativeZ * Math.sin(rotation.current);

		let dz =
			relativeX * Math.sin(rotation.current) +
			relativeZ * Math.cos(rotation.current);

		simulationSDK.setMoveDirection({
			x: dx,
			y: 0,
			z: -dz,
		});
	}, [a, s, d, w, simulationSDK]);

	const myPosition = myID ? participants.get(myID)?.position : undefined;

	// Because 'Canvas' creates a new React renderer, contexts cannot be shared, unfortunately
	// So we need to pass them in manually
	const auth = useContext(AuthContext);
	const simulation = useContext(SimulationServerContext);
	const mediaState = useContext(SpaceAudioContext);
	const voice = useContext(VoiceContext);
	const [canvas, setCanvas] = useState<HTMLDivElement | null>(null);

	return (
		<div style={{width: '100%', height: '100%'}} ref={(div) => setCanvas(div)}>
			<SpatialAudioListener
				position={myPosition ?? {x: 0, y: 0, z: 0}}
				rotation={0}
			/>
			{voice.voiceState.ready &&
				Object.entries(participants.toJS()).map(([id, participant]) =>
					id !== myID ? (
						<RemoteAudio userID={id} position={participant.position} key={id} />
					) : null
				)}
			<Canvas>
				<AuthContext.Provider value={auth}>
					<SimulationServerContext.Provider value={simulation}>
						<SpaceAudioContext.Provider value={mediaState}>
							<VoiceContext.Provider value={voice}>
								<PointOfViewContext.Provider value="first-person">
									<PointerLockControls
										onUpdate={(controls) =>
											(rotation.current = controls.getObject().rotation.z)
										}
										domElement={canvas ?? undefined}
									/>
									<Suspense fallback="Loading model">
										<SushiTable />
									</Suspense>
									<ambientLight intensity={0.5} />
									<Floor />
									{Object.entries(participants.toJSON()).map(
										([id, participant]) => (
											<UserModel
												position={participant.position}
												rotation={participant.rotation}
												key={id}
												me={id === myID}
												id={id}
											/>
										)
									)}
								</PointOfViewContext.Provider>
							</VoiceContext.Provider>
						</SpaceAudioContext.Provider>
					</SimulationServerContext.Provider>
				</AuthContext.Provider>
			</Canvas>
		</div>
	);
}
