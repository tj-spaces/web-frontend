import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SelectedPanelType } from '../Cluster/Cluster';
import CurrentClusterContext from '../ClusterIdContext/ClusterIdContext';
import ClusterSidebarSpaceLink from '../ClusterSidebarSpaceLink/ClusterSidebarSpaceLink';
import './ClusterSidebar.sass';

export default function ClusterSidebar({
	selectedPanel,
	setSelectedPanel
}: {
	selectedPanel?: string;
	setSelectedPanel: (a: SelectedPanelType) => void;
}) {
	const cluster = useContext(CurrentClusterContext);

	return (
		<div className="cluster-sidebar">
			<Link to="posts" className="cluster-sidebar-item">
				📰 Posts
			</Link>
			<span className="cluster-sidebar-item">💫 Spaces</span>
			<span style={{ marginLeft: '0.5em', display: 'flex', flexDirection: 'column' }}>
				{cluster.spaces.map((space) => (
					<ClusterSidebarSpaceLink clusterId={cluster.id!} space={space} />
				))}
			</span>
		</div>
	);
}
