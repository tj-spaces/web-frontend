import {createStylesheet} from '../../../styles/createStylesheet';
import {SpacePositionInfo} from '../../../typings/Space';

export interface MinimapElement {
	color: 'red' | 'blue';
	position: SpacePositionInfo;
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

export function MinimapElementComponent({
	item,
	relativeTo,
}: {
	item: MinimapElement;
	relativeTo: SpacePositionInfo;
}) {
	const relativeX = item.position.location.x;
	const relativeZ = item.position.location.z;

	return (
		<div
			className={styles('element')}
			style={{
				backgroundColor: item.color,
				transform: `rotateZ(${item.position.rotation}rad)`,
				left: `${relativeX * 5 + 50}%`,
				top: `${50 - relativeZ * 5}%`,
			}}
		>
			i
		</div>
	);
}

export default function SpaceView3DMinimap({
	elements,
	center,
}: {
	elements: MinimapElement[];
	center: SpacePositionInfo;
}) {
	return (
		<div className={styles('minimap')}>
			{elements.map((element, index) => {
				return (
					<MinimapElementComponent
						item={element}
						key={index}
						relativeTo={center}
					/>
				);
			})}
		</div>
	);
}
