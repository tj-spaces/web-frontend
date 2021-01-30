import React, { useContext } from 'react';
import { ISpace } from '../../typings/Space';
import CurrentClusterContext from '../Cluster/CurrentClusterContext/CurrentClusterContext';

import SpaceListItem from './SpaceListItem';
import SpaceCreateButton from '../SpaceCreate/SpaceCreateButton';
import BaseRow from '../BaseRow/BaseRow';

export default function SpaceList({ spaces = [] }: { spaces?: ISpace[] }) {
	const cluster = useContext(CurrentClusterContext);

	return (
		<BaseRow direction="column" spacing={1}>
			{spaces.map((space) => (
				<SpaceListItem clusterId={cluster.id!} space={space} key={space.id} />
			))}

			<SpaceCreateButton />
		</BaseRow>
	);
}
