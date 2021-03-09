/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
export default function Floor() {
	return (
		<mesh position={[0, -0.25, 0]}>
			<boxBufferGeometry attach="geometry" args={[10, 0.5, 10]} />
			<meshLambertMaterial attach="material" />
		</mesh>
	);
}
