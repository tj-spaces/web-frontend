import React from 'react';
import { useParams } from 'react-router-dom';
import Box from '../../components/Box/Box';
import Cluster from '../../components/Cluster/Cluster';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function HomePage() {
	document.title = 'Home';

	const { clusterId } = useParams<{ clusterId?: string; spaceId?: string }>();

	return (
		<Box display="flex-row" width="100vw" height="100vh">
			<Sidebar />
			{clusterId && <Cluster id={clusterId} />}
		</Box>
	);
}
