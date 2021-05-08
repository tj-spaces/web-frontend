import {forwardRef, useMemo, useRef} from 'react';
import {useLoader} from 'react-three-fiber';
import * as THREE from 'three';
import {FontLoader} from 'three';

type Props = {
	children: string | number;
	fontPath?: string;
	hAlign: 'center' | 'left' | 'right';
	vAlign: 'center' | 'top' | 'bottom';
	size: number;
} & JSX.IntrinsicElements['group'];

// inspired by https://codesandbox.io/s/sparks-and-effects-sbf2i lol
const Text = forwardRef<THREE.Group, Props>(
	(
		{
			children: text,
			hAlign,
			vAlign,
			size,
			fontPath = '/fonts/helvetiker/regular.json',
			...props
		}: Props,
		ref
	) => {
		const font = useLoader(FontLoader, fontPath);
		const config: THREE.TextGeometryParameters = useMemo(
			() => ({font, size: 1, height: 0.1}),
			[font]
		);
		const mesh = useRef<THREE.Mesh>();

		const box = useMemo(() => {
			if (!mesh.current) {
				return null;
			}

			const size = new THREE.Vector3();

			mesh.current.geometry.computeBoundingBox();
			mesh.current.geometry.boundingBox!.getSize(size);

			return size;
			// mesh.current.position.x =
			// 	hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x;
			// mesh.current.position.y =
			// 	vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y;
		}, []);

		console.log({box});

		const scale = size * 0.1;

		return (
			<group ref={ref} {...props}>
				<mesh
					ref={mesh}
					position={
						box ? [(-box.x / 2) * scale, -box.y * scale * 3, 0] : undefined
					}
					scale={[scale, scale, scale]}
				>
					<textGeometry args={[String(text), config]} attach="geometry" />
					<meshLambertMaterial attach="material" />
				</mesh>
			</group>
		);
	}
);

export default Text;
