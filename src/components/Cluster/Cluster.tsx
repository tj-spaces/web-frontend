import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useCluster from '../../hooks/useCluster';
import useSpacesInCluster from '../../hooks/useSpacesInCluster';
import Box from '../Box/Box';
import ClusterSettingsModal from '../ClusterSettingsModal/ClusterSettingsModal';
import ClusterIdContext from '../CurrentClusterContext/CurrentClusterContext';
import Space from '../Space/Space';
import SpaceCreateButton from '../SpaceCreateButton/SpaceCreateButton';
import SpaceList from '../SpaceList/SpaceList';

export type SelectedPanelType = 'spaces' | 'posts';

export default function Cluster({ id }: { id: string }) {
	const cluster = useCluster(id);
	const spaces = useSpacesInCluster(id) ?? [];
	const { spaceId } = useParams<{ spaceId?: string }>();
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	return (
		<Box display="flex-column" className="overflow-y-auto" height="100%" width="100%">
			<ClusterIdContext.Provider value={{ id, spaces }}>
				{isSettingsOpen && <ClusterSettingsModal onClose={() => setIsSettingsOpen(false)} />}

				<h1 className="padding-comfortable">
					{cluster?.name ?? 'Loading...'}{' '}
					<span onClick={() => setIsSettingsOpen(true)}>
						<i className="fas fa-cog pressable"></i>
					</span>
				</h1>
				{spaceId && <Space id={spaceId} />}
				<div className="background-color-light-1 padding-y-2 flex-row" style={{ height: '100%' }}>
					<div style={{ flex: 1 }} className="padding-x-2">
						<h1 className="color-dark-1">Spaces</h1>
						<SpaceList spaces={spaces} />
						<SpaceCreateButton />
					</div>
					<div style={{ flex: 2 }} className="padding-x-2">
						<h1 className="color-dark-1">Posts</h1>
					</div>
				</div>
			</ClusterIdContext.Provider>
		</Box>
	);
}
