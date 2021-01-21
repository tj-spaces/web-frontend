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
		<div className="background-color-dark-0 box-shadow overflow-y-auto">
			<Box display="flex-column" className="align-items-center padding-1">
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

				<SidebarIcon>
					<Link to="/explore">
						<i className="fas fa-compass"></i>
					</Link>
				</SidebarIcon>
			</Box>
		</div>
	);
}
