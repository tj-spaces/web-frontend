import {Suspense, useEffect} from 'react';
import {Canvas, extend, useLoader, useThree} from 'react-three-fiber';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

function SushiTable() {
	const table = useLoader(
		GLTFLoader,
		'https://nebulamodels.s3.amazonaws.com/models/sushi_table/model.gltf'
	);
	return (
		<primitive object={table.scene} scale={[2, 2, 2]} position={[0, -2, 0]} />
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

export default function ThirdPersonTest() {
	return (
		<div style={{width: '100vw', height: '100vh'}}>
			<Canvas camera={{position: [0, 0, 10]}}>
				<Suspense fallback="Loading model">
					<SushiTable />
				</Suspense>
				<ambientLight intensity={0.5} />
				<Controls />
				<mesh position={[0, 0, 0]}>
					<boxBufferGeometry attach="geometry" args={[10, 0.5, 10]} />
					<meshBasicMaterial attach="material" transparent opacity={0.5} />
				</mesh>
			</Canvas>
		</div>
	);
}
