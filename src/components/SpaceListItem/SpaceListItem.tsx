import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CurrentClusterContext from '../ClusterIdContext/ClusterIdContext';
import HoverableBox from '../HoverableBox/HoverableBox';
import Typography from '../Typography/Typography';

export default function SpaceListItem({ id, name }: { id: string; name: string }) {
	const clusterId = useContext(CurrentClusterContext);

	return (
		<HoverableBox>
			<Typography type="h1" alignment="center">
				<Link to={`/clusters/${clusterId}/spaces/${id}`} className="unstyled-link">
					{name}
				</Link>
			</Typography>
		</HoverableBox>
	);
}
