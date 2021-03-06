import {useContext} from 'react';
import SpaceManagerContext from '../SpaceManagerContext';

import {Suspense, useEffect, useState} from 'react';
import {Canvas, useLoader, useThree} from 'react-three-fiber';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {Position, SpaceParticipant} from '../../../typings/Space';
import useKeyboardState from '../../../hooks/useKeyboardState';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Controls() {
	const {
		camera,
		gl: {domElement},
	} = useThree();

	useEffect(() => {
		let controls = new OrbitControls(camera, domElement);
		return () => controls.dispose();
	}, [camera, domElement]);

	return null;
}

function User({position, me}: {position: Position; me: boolean}) {
	const {camera} = useThree();

	useEffect(() => {
		camera.position.set(position.x + 4, position.y + 2, position.z + 4);
		camera.lookAt(position.x, position.y, position.z);
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

export default function SpaceView3D() {
	const manager = useContext(SpaceManagerContext);

	const [participants, setParticipants] = useState<
		Record<string, SpaceParticipant>
	>({});
	const [myID, setMyID] = useState<string>();

	useEffect(() => {
		manager
			.addListener('users', (users) => setParticipants(users))
			.addListener('user_join', (user) => {
				setParticipants((participants) => ({...participants, [user.id]: user}));
			})
			.addListener('user_leave', (user) => {
				setParticipants(({[user]: _, ...participants}) => participants);
			})
			.addListener('user_move', ({id, new_position}) => {
				setParticipants((participants) => ({
					...participants,
					[id]: {...participants[id], position: new_position},
				}));
			})
			.addListener('user_direction', ({id, direction}) => {
				setParticipants((participants) => ({
					...participants,
					[id]: {...participants[id], moving_direction: direction},
				}));
			})
			.addListener('auth', ({participant_id}) => {
				setMyID(participant_id);
			});

		return () => {
			manager.destroy();
		};
	}, [manager]);

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
			<Canvas camera={{position: [x, 10, z]}}>
				<Suspense fallback="Loading model">
					<SushiTable />
				</Suspense>
				<ambientLight intensity={0.5} />
				{/* <Controls /> */}
				<mesh position={[0, -0.25, 0]}>
					<boxBufferGeometry attach="geometry" args={[10, 0.5, 10]} />
					<meshLambertMaterial attach="material" />
				</mesh>
				{Object.entries(participants).map(([id, participant]) => (
					<User position={participant.position} key={id} me={id === myID} />
				))}
			</Canvas>
		</div>
	);
}
