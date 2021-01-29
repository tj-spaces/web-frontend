import React, { useContext } from 'react';
import { ISpace } from '../../typings/Space';
import CurrentClusterContext from '../Cluster/CurrentClusterContext/CurrentClusterContext';

import './SpaceList.sass';
import '../../styles/box.sass';
import SpaceListItem from '../SpaceListItem/SpaceListItem';
import { classes, createStylesheet } from '../../styles/createStylesheet';

const Styles = createStylesheet({
	spaceList: {
		display: 'flex',
		flexDirection: 'column',
		paddingTop: '0.5em',
		paddingBottom: '0.5em'
	}
});

export default function SpaceList({ spaces = [] }: { spaces?: ISpace[] }) {
	const cluster = useContext(CurrentClusterContext);

	return (
		<div className={classes(Styles.spaceList)}>
			{spaces.map((space) => (
				<SpaceListItem clusterId={cluster.id!} space={space} key={space.id} />
			))}
		</div>
	);
}
