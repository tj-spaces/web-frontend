import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Box from '../Box/Box';
import CurrentClusterContext from '../ClusterIdContext/ClusterIdContext';

export default function SpaceListItem({ id, name }: { id: string; name: string }) {
	const clusterId = useContext(CurrentClusterContext);

	return (
		<Box center padding="comfortable" margin="comfortable">
			<Link to={`/cluster/${clusterId}/space/${id}`} className="unstyled-link">
				{name}
			</Link>
		</Box>
	);
}
