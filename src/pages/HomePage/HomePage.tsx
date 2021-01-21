import React from 'react';
import { useParams } from 'react-router-dom';
import Box from '../../components/Box/Box';
import Cluster from '../../components/Cluster/Cluster';
import ClusterCreateButton from '../../components/ClusterCreateButton/ClusterCreateButton';
import SidebarIcon from '../../components/SidebarIcon/SidebarIcon';
import useMyClusters from '../../hooks/useMyClusters';

export default function HomePage() {
	document.title = 'Home';

	const myClusters = useMyClusters() ?? [];
	const { clusterId, spaceId } = useParams<{ clusterId: string; spaceId?: string }>();

	return (
		<Box display="flex-row" width="100vw" height="100vh">
			<Box
				display="flex-column"
				style={{
					backgroundColor: '#202020',
					height: '100%',
					flex: 1,
					alignItems: 'center',
					paddingTop: '0.25em',
					paddingBottom: '0.25em'
				}}
			>
				{myClusters.map((cluster) => (
					<SidebarIcon key={cluster.id} title={cluster.name} to={`/clusters/${cluster.id}`} />
				))}
				<ClusterCreateButton />
			</Box>
			<div style={{ flex: 15, margin: '2em' }}>{clusterId && <Cluster id={clusterId} />}</div>
		</Box>
	);
}
