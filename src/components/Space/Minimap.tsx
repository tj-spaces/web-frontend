import { SpacePositionInfo } from '../../typings/SpaceParticipant';

export interface MinimapItem {
	color: 'red' | 'blue';
	position: SpacePositionInfo;
}

export function MinimapItemComponent({ item }: { item: MinimapItem }) {
	return (
		<div
			style={{
				backgroundColor: item.color,
				color: 'white',
				transform: `rotateZ(${item.position.rotation}rad)`,
				transformOrigin: 'center',
				width: '1em',
				height: '1em',
				textAlign: 'center',
				left: `${item.position.location.x}em`,
				top: `${-item.position.location.z}em`,
				position: 'absolute'
			}}
		>
			i
		</div>
	);
}

export default function Minimap({ items }: { items: MinimapItem[] }) {
	return (
		<div style={{ position: 'absolute', width: '400px', height: '400px', backgroundColor: 'white' }}>
			{items.map((item, index) => {
				return <MinimapItemComponent item={item} key={index} />;
			})}
		</div>
	);
}
