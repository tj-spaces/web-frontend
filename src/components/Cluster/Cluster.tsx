import useSpacesInCluster from '../../hooks/useSpacesInCluster';
import ClusterCurrentClusterContext from '../ClusterCurrentClusterContext/ClusterCurrentClusterContext';
import SpaceCreateButton from '../SpaceCreateButton/SpaceCreateButton';
import SpaceList from '../SpaceList/SpaceList';
import Typography from '../Typography/Typography';

export default function Cluster({ id, creatorId, name }: { id: string; creatorId: string; name: string }) {
	const spaces = useSpacesInCluster(id);

	return (
		<ClusterCurrentClusterContext.Provider value={id}>
			<Typography type="h1" alignment="center">
				{name}
			</Typography>
			<SpaceList spaces={spaces} />
			<SpaceCreateButton />
		</ClusterCurrentClusterContext.Provider>
	);
}
