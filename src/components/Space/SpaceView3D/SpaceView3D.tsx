import React, {useContext, useLayoutEffect, useRef} from 'react';
import {useFocusState} from './PixelSpaceRenderer';
import SpaceManagerContext from '../SpaceManagerContext';
import SpaceUnfocusedCover from './SpaceUnfocusedCover';

export default function SpaceView3D() {
	const manager = useContext(SpaceManagerContext);
	const focused = useFocusState(manager);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useLayoutEffect(() => {
		if (canvasRef.current) {
			manager.setCanvas(canvasRef.current);
		}
		return () => {
			manager.destroy();
		};
	}, [manager]);

	return (
		<>
			{!focused && <SpaceUnfocusedCover />}

			<canvas ref={canvasRef} style={{width: '100%', height: '100%'}} />
		</>
	);
}
