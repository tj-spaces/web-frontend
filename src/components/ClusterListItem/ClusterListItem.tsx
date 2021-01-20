import { ICluster } from '../../typings/Cluster';

export default function ClusterListItem({ cluster }: { cluster: ICluster }) {
	return (
		<div className="cluster-list-item">
			<a href={`/clusters/${cluster.id}`}>{cluster.name}</a>
			<br />
			Created by {cluster.creator_id}
		</div>
	);
}
