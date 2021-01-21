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
		<Box display="flex-column" height="100%" width="100%">
			<ClusterIdContext.Provider value={{ id, spaces }}>
				<h1 className="padding-comfortable">{cluster?.name ?? 'Loading...'}</h1>
				<div className="background-color-light-1 padding-comfortable" style={{ height: '100%' }}>
					<h1 className="color-dark-1">Spaces</h1>
					<SpaceList spaces={spaces} />
					<h1 className="color-dark-1">Posts</h1>
				</div>
			</ClusterIdContext.Provider>
		</Box>
	);
}
