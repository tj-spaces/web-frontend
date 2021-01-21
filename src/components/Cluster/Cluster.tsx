import { useState } from 'react';
import useCluster from '../../hooks/useCluster';
import useSpacesInCluster from '../../hooks/useSpacesInCluster';
import Box from '../Box/Box';
import ClusterIdContext from '../ClusterIdContext/ClusterIdContext';
import ClusterSidebar from '../ClusterSidebar/ClusterSidebar';
import SpaceList from '../SpaceList/SpaceList';
import Typography from '../Typography/Typography';

export type SelectedPanelType = 'spaces' | 'posts';

export default function Cluster({ id }: { id: string }) {
	const cluster = useCluster(id);
	const [selectedPanel, setSelectedPanel] = useState<SelectedPanelType>();
	const spaces = useSpacesInCluster(id) ?? [];

	return (
		<ClusterIdContext.Provider value={{ id, spaces }}>
			<Box display="flex-column" height="100%">
				<h2 style={{ marginLeft: '0.5em', flex: 1 }}>{cluster?.name ?? 'Loading...'}</h2>
				<div className="background-color-2" style={{ flex: 16 }}>
					<SpaceList spaces={spaces} />
					<ClusterSidebar selectedPanel={selectedPanel} setSelectedPanel={setSelectedPanel} />
				</div>
			</Box>
		</ClusterIdContext.Provider>
	);
}
