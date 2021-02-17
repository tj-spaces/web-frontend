import {useLayoutEffect, useRef} from 'react';
import PixelSpaceRenderer from './PixelSpaceRenderer';
import SpaceManager from './SpaceManager';

export default function PixelSpace({id}: {id: string}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const renderRef = useRef<PixelSpaceRenderer>();
	const managerRef = useRef<SpaceManager>(new SpaceManager(id));

	useLayoutEffect(() => {
		const canvas = canvasRef.current!;
		renderRef.current = new PixelSpaceRenderer(
			canvas.getContext('2d')!,
			managerRef.current
		);
	}, []);

	return (
		<div>
			<h1>{id}</h1>
			<canvas ref={canvasRef} />
		</div>
	);
}
