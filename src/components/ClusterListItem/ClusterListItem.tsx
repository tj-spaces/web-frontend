import React from 'react';
import { Link } from 'react-router-dom';
import { ICluster } from '../../typings/Cluster';
import HoverableBox from '../HoverableBox/HoverableBox';
import Typography from '../Typography/Typography';

export default function ClusterListItem({ cluster }: { cluster: ICluster }) {
	return (
		<HoverableBox>
			<Typography type="h1" alignment="center">
				<Link to={`/clusters/${cluster.id}`} className="unstyled-link">
					{cluster.name}
				</Link>
			</Typography>
		</HoverableBox>
	);
}
