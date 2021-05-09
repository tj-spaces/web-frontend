import {MutableRefObject, useContext, useEffect} from 'react';
import useKeyboardState from '../../hooks/useKeyboardState';
import SimulationServerContext from './simulation/SimulationServerContext';

export default function useMoveDirectionUpdater(
	rotation: MutableRefObject<number>,
	canvasElement: HTMLElement | null
) {
	const {simulationSDK} = useContext(SimulationServerContext);

	const {a = false, s = false, d = false, w = false} = useKeyboardState(
		document.body
	);

	useEffect(() => {
		if (
			document.pointerLockElement == null ||
			document.pointerLockElement !== canvasElement
		) {
			return;
		}

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
	}, [a, s, d, w, simulationSDK, rotation, canvasElement]);
}
