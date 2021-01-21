import useCluster from '../../hooks/useCluster';
import useSpacesInCluster from '../../hooks/useSpacesInCluster';
import Box from '../Box/Box';
import Button from '../Button/Button';
import ClusterIdContext from '../ClusterIdContext/ClusterIdContext';
import SpaceCreateButton from '../SpaceCreateButton/SpaceCreateButton';
import SpaceList from '../SpaceList/SpaceList';
import Typography from '../Typography/Typography';

export default function Cluster({ id }: { id: string }) {
	const cluster = useCluster(id);
	const spaces = useSpacesInCluster(id);

	return (
		<ClusterIdContext.Provider value={id}>
			<Typography type="title" alignment="center">
				{cluster?.name ?? 'Loading...'}
			</Typography>
			<Box display="flex-row" style={{ margin: '0.5em 0em' }}>
				<SpaceCreateButton />
			</Box>
			<SpaceList spaces={spaces} />
		</ClusterIdContext.Provider>
	);
}
