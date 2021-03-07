export default function Floor() {
	return (
		<mesh position={[0, -0.25, 0]}>
			<boxBufferGeometry attach="geometry" args={[10, 0.5, 10]} />
			<meshLambertMaterial attach="material" />
		</mesh>
	);
}
