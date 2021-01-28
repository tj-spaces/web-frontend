import React, { useContext } from 'react';
import { ISpace } from '../../typings/Space';
import CurrentClusterContext from '../Cluster/CurrentClusterContext/CurrentClusterContext';

import './SpaceList.sass';
import '../../styles/box.sass';
import SpaceListItem from '../SpaceListItem/SpaceListItem';

export default function SpaceList({ spaces = [] }: { spaces?: ISpace[] }) {
	const cluster = useContext(CurrentClusterContext);

	return (
		<div className="space-list">
			{spaces.map((space) => (
				<SpaceListItem clusterId={cluster.id!} space={space} key={space.id} />
			))}
		</div>
	);
}
