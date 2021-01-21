import React from 'react';
import { Link } from 'react-router-dom';
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
			className="background-color-dark-0 align-items-center box-shadow"
			style={{
				padding: '1em'
			}}
		>
			{myClusters.map((cluster) => (
				<SpaceSidebarIcon key={cluster.id} title={cluster.name} to={`/clusters/${cluster.id}`} />
			))}

			<SidebarIcon>
				<ClusterCreateButton />
			</SidebarIcon>

			<SidebarIcon>
				<Link to="/logout">
					<i className="fas fa-sign-out-alt"></i>
				</Link>
			</SidebarIcon>
		</Box>
	);
}
