import React from 'react';
import useMyClusters from '../../hooks/useMyClusters';
import Box from '../Box/Box';
import ClusterCreateButton from '../ClusterCreateButton/ClusterCreateButton';
import SidebarIcon from '../SidebarIcon/SidebarIcon';
import SpaceSidebarIcon from '../SpaceSidebarIcon/SpaceSidebarIcon';

export default function Sidebar() {
	const myClusters = useMyClusters() ?? [];

	return (
		<Box
			display="flex-column"
			style={{
				backgroundColor: '#202020',
				height: '100%',
				alignItems: 'center',
				padding: '1em'
			}}
		>
			{myClusters.map((cluster) => (
				<SpaceSidebarIcon key={cluster.id} title={cluster.name} to={`/clusters/${cluster.id}`} />
			))}

			<SidebarIcon>
				<ClusterCreateButton />
			</SidebarIcon>
		</Box>
	);
}
