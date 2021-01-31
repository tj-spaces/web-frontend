import React from 'react';
import { Link } from 'react-router-dom';
import useMyClusters from '../../hooks/useMyClusters';
import { createStylesheet } from '../../styles/createStylesheet';
import ClusterCreateButton from '../Cluster/ClusterCreateButton';
import ClusterSidebarIcon from './ClusterSidebarIcon';
import SidebarIcon from './SidebarIcon';

export const styles = createStylesheet({
	sidebar: {
		backgroundColor: 'var(--spaces-color-dark-0)',
		overflowY: 'auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '1em'
	}
});

export default function Sidebar() {
	const myClusters = useMyClusters() ?? [];

	return (
		<div className={styles.sidebar}>
			{myClusters.map((cluster) => (
				<ClusterSidebarIcon key={cluster.id} title={cluster.name} to={`/clusters/${cluster.id}`} />
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
		</div>
	);
}
