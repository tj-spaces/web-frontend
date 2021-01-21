import { ISpace } from '../../typings/Space';
import { Link } from 'react-router-dom';

export default function SpaceListItem({ clusterId, space }: { clusterId: string; space: ISpace }) {
	console.log(space);

	return (
		<div
			className="hoverable-light-box foreground-color-muted column-item"
			style={{ height: '5em', fontSize: '1.25em' }}
		>
			<b>
				<Link to={`/clusters/${clusterId}/spaces/${space.id}`} className="unstyled-link">
					{space.name}
				</Link>
			</b>
			<br />
			<b className="color-light-1" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>
				Online: {space.online_count}
			</b>
		</div>
	);
}
