import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { createStylesheet } from '../../styles/createStylesheet';
import hoverableLightBox from '../../styles/hoverableLightBox';
import { SpaceSession } from '../../typings/SpaceSession';
import BaseRow from '../Base/BaseRow';
import SpaceCreateButton from './ClusterSpaceCreateButton';
import ClusterIDContext from './CurrentClusterContext';

const styles = createStylesheet({
	spaceOnlineCount: {
		fontSize: '0.75rem',
		textTransform: 'uppercase',
		color: 'var(--spaces-color-light-1)'
	},
	spaceListItem: {
		extends: [hoverableLightBox.hoverableLightBox],
		height: '5em',
		fontSize: '1.25em'
	}
});

export function ClusterSpaceListItem({ clusterId, space }: { clusterId: string; space: SpaceSession }) {
	return (
		<div className={styles('spaceListItem')}>
			<b>
				<Link to={`/spaces/${space.id}`} className="unstyled-link">
					{space.name}
				</Link>
			</b>
			<br />
			<b className={styles('spaceOnlineCount')}>Online: {space.online_count}</b>
		</div>
	);
}

export default function ClusterSpaceList({ spaces = [] }: { spaces?: SpaceSession[] }) {
	const cluster = useContext(ClusterIDContext);

	return (
		<BaseRow direction="column" spacing={1}>
			{spaces.map((space) => (
				<ClusterSpaceListItem clusterId={cluster.id!} space={space} key={space.id} />
			))}

			<SpaceCreateButton />
		</BaseRow>
	);
}
