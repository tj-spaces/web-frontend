import { ICluster } from '../../typings/Cluster';
import ClusterListItem from '../ClusterListItem/ClusterListItem';
import Box from '../Box/Box';

export default function ClusterList({ clusters }: { clusters: ICluster[] }) {
	return (
		<Box display="flex-column">
			{clusters.map((cluster) => (
				<ClusterListItem key={cluster.id} cluster={cluster} />
			))}
		</Box>
	);
}
