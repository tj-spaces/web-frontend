import {Suspense, useEffect, useState} from 'react';
import {Canvas, extend, useLoader, useThree} from 'react-three-fiber';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {Position} from '../typings/Space';

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

extend({OrbitControls});

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

function User({position}: {position: Position}) {
	return (
		<mesh position={[position.x, position.y, position.z]}>
			<boxBufferGeometry attach="geometry" args={[1, 2, 0.5]} />
			<meshLambertMaterial attach="material" color="#ff6666" />
		</mesh>
	);
}

export default function ThirdPersonTest() {
	let [x, setX] = useState(0);
	let [z, setZ] = useState(0);

	useEffect(() => {
		const listener = (ev: KeyboardEvent) => {
			// TODO: Make these relative to the user's rotation
			switch (ev.key) {
				case 'a':
					setX((x) => x - 1);
					break;
				case 'd':
					setX((x) => x + 1);
					break;
				case 'w':
					setZ((z) => z - 1);
					break;
				case 's':
					setZ((z) => z + 1);
					break;
			}
		};

		window.addEventListener('keypress', listener);

		return () => {
			window.removeEventListener('keypress', listener);
		};
	}, []);

	return (
		<div style={{width: '100vw', height: '100vh'}}>
			<Canvas camera={{position: [0, 0, 10]}}>
				<Suspense fallback="Loading model">
					<SushiTable />
				</Suspense>
				<ambientLight intensity={0.5} />
				<Controls />
				<mesh position={[0, -0.25, 0]}>
					<boxBufferGeometry attach="geometry" args={[10, 0.5, 10]} />
					<meshLambertMaterial attach="material" />
				</mesh>
				<User position={{x, y: 1, z}} />
			</Canvas>
		</div>
	);
}
