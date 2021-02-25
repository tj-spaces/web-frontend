import React, {useContext, useLayoutEffect, useRef} from 'react';
import {useFocusState} from './PixelSpaceRenderer';
import SpaceManagerContext from './SpaceManagerContext';
import SpaceUnfocusedCover from './SpaceUnfocusedCover';
import SpaceView2DPixellated from './spaceView2DPixellated/SpaceView2DPixellated';

export default function Space() {
	const manager = useContext(SpaceManagerContext);
	const focused = useFocusState(manager);
	// const canvasRef = useRef<HTMLCanvasElement>(null);

	// useLayoutEffect(() => {
	// 	if (canvasRef.current) {
	// 		manager.setCanvas(canvasRef.current);
	// 	}
	// 	return () => {
	// 		manager.destroy();
	// 	};
	// }, [manager]);

	return (
		<>
			{/* {!focused && <SpaceUnfocusedCover />} */}

			<SpaceView2DPixellated />

			{/* <canvas ref={canvasRef} style={{width: '100%', height: '100%'}} /> */}
		</>
	);
}
