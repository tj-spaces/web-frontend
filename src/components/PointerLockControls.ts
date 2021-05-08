import {useCallback, useEffect, useMemo, useRef} from 'react';
import {useThree} from 'react-three-fiber';
import {Camera, Euler} from 'three';

// Set to constrain the pitch of the camera
// Range is 0 to Math.PI radians
const minPolarAngle = 0; // radians
const middlePolarAngle = Math.PI / 2; // radians
const maxPolarAngle = Math.PI; // radians

export default function PointerLockControls({
	sensitivity = 0.002,
	element,
	onUpdate,
}: {
	sensitivity?: number;
	element: HTMLElement;
	onUpdate: (camera: Camera) => void;
}) {
	const {camera} = useThree();

	const locked = useRef(false);
	const euler = useMemo(() => new Euler(0, 0, 0, 'YXZ'), []);

	const onMouseMove = useCallback(
		(event: MouseEvent) => {
			if (locked.current === false) {
				return;
			}

			const {movementX = 0, movementY = 0} = event;

			euler.setFromQuaternion(camera.quaternion);

			euler.y -= movementX * sensitivity;
			euler.x -= movementY * sensitivity;

			euler.x = Math.max(
				middlePolarAngle - maxPolarAngle,
				Math.min(middlePolarAngle - minPolarAngle, euler.x)
			);

			camera.quaternion.setFromEuler(euler);

			onUpdate(camera);
		},
		[camera, euler, onUpdate, sensitivity]
	);

	// Click listener
	useEffect(() => {
		const requestPointerLock = () => {
			element.requestPointerLock();
		};

		element.addEventListener('click', requestPointerLock);

		return () => element.removeEventListener('click', requestPointerLock);
	}, [element]);

	// Mouse move listener
	useEffect(() => {
		element.addEventListener('mousemove', onMouseMove);

		return () => element.removeEventListener('mousemove', onMouseMove);
	}, [element, onMouseMove]);

	useEffect(() => {
		const document = element.ownerDocument;

		const onPointerLockChange = () => {
			if (document.pointerLockElement === element) {
				locked.current = true;
			} else {
				locked.current = false;
			}
		};

		const onPointerLockError = () => {
			console.error('Pointer lock error. Likely due to spammed clicks');
		};

		document.addEventListener('pointerlockchange', onPointerLockChange);
		document.addEventListener('pointerlockerror', onPointerLockError);

		return () => {
			document.removeEventListener('pointerlockchange', onPointerLockChange);
			document.removeEventListener('pointerlockerror', onPointerLockError);
		};
	}, [element]);

	return null;
}
