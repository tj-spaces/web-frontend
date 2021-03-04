import {AssertionError} from 'assert';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {createStylesheet} from '../../styles/createStylesheet';
import hoverableLightBox from '../../styles/hoverableLightBox';
import {Space} from '../../typings/Space';
import BaseRow from '../base/BaseRow';
import CreateInstantSpaceButton from '../CreateInstantSpaceButton';
import CurrentClusterContext from './CurrentClusterContext';

const styles = createStylesheet({
	spaceOnlineCount: {
		fontSize: '0.75rem',
		textTransform: 'uppercase',
		color: 'var(--text-primary)',
	},
	spaceListItem: {
		extends: [hoverableLightBox.hoverableLightBox],
		height: '5em',
		fontSize: '1.25em',
	},
});

export function ClusterSpaceListItem({
	clusterID,
	space,
}: {
	clusterID: string;
	space: Space;
}) {
	return (
		<div className={styles('spaceListItem')}>
			<b>
				<Link to={`/spaces/${space.id}`} className="unstyled-link">
					{space.name}
				</Link>
			</b>
			<br />
			<b className={styles('spaceOnlineCount')}>Online: 1.2K</b>
		</div>
	);
}

export default function ClusterSpaceList({spaces = []}: {spaces?: Space[]}) {
	const cluster = useContext(CurrentClusterContext);

	if (cluster == null) {
		throw new AssertionError({message: 'cluster == null'});
	}

	return (
		<BaseRow direction="column" spacing={1}>
			{spaces.map((space) => (
				<ClusterSpaceListItem
					clusterID={cluster.id}
					space={space}
					key={space.id}
				/>
			))}

			<CreateInstantSpaceButton cluster={cluster} />
		</BaseRow>
	);
}
