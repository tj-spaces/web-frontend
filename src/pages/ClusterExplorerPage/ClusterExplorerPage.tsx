import React from 'react';
import Box from '../../components/Box/Box';
import ClusterExplorer from '../../components/ClusterExplorer/ClusterExplorer';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function HomePage() {
	document.title = 'Home';

	return (
		<Box display="flex-row" width="100vw" height="100vh">
			<Sidebar />
			<ClusterExplorer />
		</Box>
	);
}
