import React, {useState} from 'react';
import {useCluster} from '../../api/clusters';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import ClusterSettingsModal from './ClusterSettingsModal';
import ClusterSidebar from './ClusterSidebar';
import CurrentClusterContext from './CurrentClusterContext';

/**
 * Renders the main page for a cluster. This includes the list of Spaces and list of Posts in the cluster.
 * It also holds the button for displaying or hiding the settings.
 */
export default function Cluster({id}: {id: string}) {
	const cluster = useCluster(id);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	if (cluster == null) {
		return null;
	}

	return (
		<CurrentClusterContext.Provider value={cluster}>
			{isSettingsOpen && (
				<ClusterSettingsModal onClose={() => setIsSettingsOpen(false)} />
			)}

			<BaseRow
				direction="row"
				rails={1}
				backgroundColor="bgSecondary"
				width="100%"
				height="100%"
			>
				<ClusterSidebar
					sections={[]}
					clusterName={cluster.name}
					isOpen={isSidebarOpen}
				/>
				<div
					style={{
						flex: 4,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						paddingTop: '5rem',
					}}
				>
					<BaseText variant="primary-title" alignment="center">
						wave to your friends and get the party started!
					</BaseText>
				</div>
			</BaseRow>
		</CurrentClusterContext.Provider>
	);
}
