import React from 'react';
import { Link } from 'react-router-dom';
import useMyClusters from '../../hooks/useMyClusters';
import { createStylesheet } from '../../styles/createStylesheet';
import Box from '../Box/Box';
import ClusterCreateButton from '../Cluster/ClusterCreateButton/ClusterCreateButton';
import SidebarIcon from '../SidebarIcon/SidebarIcon';
import SpaceSidebarIcon from '../SpaceSidebarIcon/SpaceSidebarIcon';

export const styles = createStylesheet({
	sidebar: {
		backgroundColor: 'var(--spaces-color-dark-0)',
		overflowY: 'auto'
	}
});

export default function Sidebar() {
	const myClusters = useMyClusters() ?? [];

	return (
		<div className={styles.sidebar}>
			<Box variant="paddedColumn">
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
