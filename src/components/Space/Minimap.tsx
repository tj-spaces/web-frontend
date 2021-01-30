import { createStylesheet } from '../../styles/createStylesheet';
import { SpacePositionInfo } from '../../typings/SpaceParticipant';

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
		transition: 'left 500ms ease, right 500ms ease'
	},
	minimap: {
		position: 'absolute',
		width: '25%',
		height: '25%',
		backgroundColor: 'white'
	}
});

export function MinimapElementComponent({ item, relativeTo }: { item: MinimapElement; relativeTo: SpacePositionInfo }) {
	const relativeX = item.position.location.x - relativeTo.location.x;
	const relativeZ = relativeTo.location.z - item.position.location.z;

	return (
		<div
			className={styles.element}
			style={{
				backgroundColor: item.color,
				transform: `rotateZ(${item.position.rotation}rad)`,
				left: `${relativeX * 5 + 50}%`,
				top: `${relativeZ * 5 + 50}%`
			}}
		>
			i
		</div>
	);
}

export default function Minimap({ elements, center }: { elements: MinimapElement[]; center: SpacePositionInfo }) {
	return (
		<div className={styles.minimap}>
			{elements.map((element, index) => {
				return <MinimapElementComponent item={element} key={index} relativeTo={center} />;
			})}
		</div>
	);
}
