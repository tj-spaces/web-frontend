import {MutableRefObject, useContext} from 'react';
import {useThree} from 'react-three-fiber';
import PointOfViewContext from './PointOfViewContext';
import {useMyPosition} from './simulation/SimulationHooks';

/**
 * This is a component so we can easily access the Three.js camera.
 * @param pov Determines how to render the Camera position.
 * @param rotation
 * @param position
 * @returns null
 */
export default function CameraPositionUpdater({
	rotation,
}: {
	rotation: MutableRefObject<number>;
}) {
	const {camera} = useThree();
	const pov = useContext(PointOfViewContext);
	const position = useMyPosition();

	if (position == null) {
		return null;
	}

	if (pov === 'third-person') {
		let offset = {
			x: Math.sin(rotation.current),
			z: Math.cos(rotation.current),
		};
		camera.position.set(
			position.x + offset.x * 2,
			position.y + 4,
			position.z + offset.z * 6
		);
		camera.rotation.set(-Math.PI / 8, rotation.current, 0);
	} else {
		camera.position.set(position.x, position.y + 2, position.z);
	}

	return null;
}
