import useSpacesInCluster from '../../hooks/useSpacesInCluster';
import Box from '../Box/Box';
import Button from '../Button/Button';
import ClusterIdContext from '../ClusterIdContext/ClusterIdContext';
import SpaceCreateButton from '../SpaceCreateButton/SpaceCreateButton';
import SpaceList from '../SpaceList/SpaceList';
import Typography from '../Typography/Typography';

export default function Cluster({ id, creatorId, name }: { id: string; creatorId: string; name: string }) {
	const spaces = useSpacesInCluster(id);

	return (
		<ClusterIdContext.Provider value={id}>
			<Typography type="title" alignment="center">
				{name}
			</Typography>
			<Box display="flex-row">
				<SpaceCreateButton />
				<Button to="/">Home</Button>
			</Box>
			<SpaceList spaces={spaces} />
		</ClusterIdContext.Provider>
	);
}
