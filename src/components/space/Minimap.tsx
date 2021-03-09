/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {createStylesheet} from '../../styles/createStylesheet';
import {Position} from '../../typings/Space';

export interface MinimapElement {
	color: 'red' | 'blue';
	position: Position;
	rotation: number;
}

export const styles = createStylesheet({
	element: {
		color: 'white',
		transformOrigin: 'center',
		width: '1em',
		height: '1em',
		textAlign: 'center',
		position: 'absolute',
		transition: 'left 500ms ease, top 500ms ease, transform 500ms ease',
	},
	minimap: {
		position: 'absolute',
		width: '25%',
		height: '25%',
		backgroundColor: 'white',
		border: '1px solid black',
		margin: '1rem',
	},
});

export function MinimapElementComponent({item}: {item: MinimapElement}) {
	const relativeX = item.position.x;
	const relativeZ = item.position.z;

	return (
		<div
			className={styles('element')}
			style={{
				backgroundColor: item.color,
				transform: `rotateZ(${item.rotation}rad)`,
				left: `${relativeX * 5 + 50}%`,
				top: `${50 - relativeZ * 5}%`,
			}}
		>
			i
		</div>
	);
}

export default function Minimap({elements}: {elements: MinimapElement[]}) {
	return (
		<div className={styles('minimap')}>
			{elements.map((element, index) => {
				return <MinimapElementComponent item={element} key={index} />;
			})}
		</div>
	);
}
