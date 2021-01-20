import { ICluster } from '../../typings/Cluster';
import ClusterListItem from '../ClusterListItem/ClusterListItem';

export default function ClusterList({ clusters }: { clusters: ICluster[] }) {
	return (
		<div className="cluster-list">
			{clusters.map((cluster) => (
				<ClusterListItem key={cluster.id} cluster={cluster} />
			))}
		</div>
	);
}
