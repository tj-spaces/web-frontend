import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ISpace } from '../../typings/Space';

export default function ClusterSidebarSpaceLink({ clusterId, space }: { clusterId: string; space: ISpace }) {
	const { spaceId: selectedSpaceId } = useParams<{ spaceId?: string }>();
	console.log('spaceID is', selectedSpaceId, 'mine is', space.id);
	return (
		<Link
			className={'cluster-sidebar-item' + (space.id === selectedSpaceId ? ' highlighted' : '')}
			to={'/clusters/' + clusterId + '/spaces/' + space.id}
			key={space.id}
		>
			{space.name}
		</Link>
	);
}
