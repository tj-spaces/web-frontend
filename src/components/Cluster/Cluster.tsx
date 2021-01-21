import useCluster from '../../hooks/useCluster';
import useSpacesInCluster from '../../hooks/useSpacesInCluster';
import Box from '../Box/Box';
import ClusterIdContext from '../CurrentClusterContext/CurrentClusterContext';
import SpaceList from '../SpaceList/SpaceList';

export type SelectedPanelType = 'spaces' | 'posts';

export default function Cluster({ id }: { id: string }) {
	const cluster = useCluster(id);
	const spaces = useSpacesInCluster(id) ?? [];

	return (
		<Box display="flex-column" height="100%">
			<ClusterIdContext.Provider value={{ id, spaces }}>
				<h1 style={{ marginLeft: '0.5em', flex: 1 }}>{cluster?.name ?? 'Loading...'}</h1>
				<div className="background-color-2 padding-comfortable" style={{ flex: 16 }}>
					<h2>Spaces</h2>
					<SpaceList spaces={spaces} />
					<h2>Posts</h2>
				</div>
			</ClusterIdContext.Provider>
		</Box>
	);
}
