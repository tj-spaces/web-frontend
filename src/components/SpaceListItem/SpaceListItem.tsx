import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ISpace } from '../../typings/Space';
import CurrentClusterContext from '../ClusterIdContext/ClusterIdContext';
import HoverableBox from '../HoverableBox/HoverableBox';
import Typography from '../Typography/Typography';

export default function SpaceListItem({ space }: { space: ISpace }) {
	const cluster = useContext(CurrentClusterContext);

	return (
		<HoverableBox>
			<Typography type="h2" alignment="center">
				<Link to={`/clusters/${cluster.id}/spaces/${space.id}`} className="unstyled-link">
					{space.name}
				</Link>
			</Typography>
		</HoverableBox>
	);
}
