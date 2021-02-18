import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';

interface Point {
	x: number;
	z: number;
}

function getCursorPosition(canvas: HTMLCanvasElement, event: MouseEvent) {
	const rect = canvas.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	return {x, y};
}

export default function ModelViewerTest() {
	const [points, setPoints] = useState<Point[]>([]);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const context2DRef = useRef<CanvasRenderingContext2D>();
	const [scrollLevel, setScrollLevel] = useState<number>(1);

	useLayoutEffect(() => {
		const canvas = canvasRef.current;

		if (canvas && !context2DRef.current) {
			context2DRef.current = canvas.getContext('2d')!;
			const keyListener = (ev: KeyboardEvent) => {
				console.log('Key was released:', ev.key);
				switch (ev.key) {
					case 'f':
						setScrollLevel((scrollLevel) => scrollLevel / 2);
						break;
					case 'g':
						setScrollLevel((scrollLevel) => scrollLevel * 2);
						break;
				}
			};
			canvas.addEventListener('keyup', keyListener);

			return () => canvas.removeEventListener('keyup', keyListener);
		}
	}, []);

	const mapModelPosToScreenPos = useCallback(
		(point: Point): Point => ({
			x: point.x * scrollLevel,
			z: point.z * scrollLevel,
		}),
		[scrollLevel]
	);

	const mapScreenPosToModelPos = useCallback(
		(point: Point): Point => ({
			x: point.x / scrollLevel,
			z: point.z / scrollLevel,
		}),
		[scrollLevel]
	);

	useEffect(() => {
		const canvas = canvasRef.current;

		if (canvas) {
			const clickListener = (evt: MouseEvent) => {
				const {x, y} = getCursorPosition(canvasRef.current!, evt);
				setPoints((points) => [...points, mapScreenPosToModelPos({x, z: y})]);
			};
			canvas.addEventListener('click', clickListener);

			return () => canvas?.removeEventListener('click', clickListener);
		}
	}, [mapScreenPosToModelPos]);

	useEffect(() => {
		const ctx = context2DRef.current!;
		ctx.fillStyle = '#FFFFFF';
		ctx.fillRect(0, 0, 500, 400);
		ctx.fillStyle = '#FF0000';
		points.forEach((point) => {
			const {x, z} = mapModelPosToScreenPos(point);
			ctx.beginPath();
			ctx.ellipse(x, z, 10, 10, 0, 0, Math.PI * 2);
			ctx.stroke();
		});
	}, [mapModelPosToScreenPos, points, scrollLevel]);

	return (
		<canvas
			width="500px"
			height="400px"
			tabIndex={0}
			ref={canvasRef}
			style={{width: '500px', height: '500px', marginTop: '20em'}}
		></canvas>
	);
}
