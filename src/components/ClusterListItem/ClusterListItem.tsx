import { ICluster } from '../../typings/Cluster';

export default function ClusterListItem({ cluster }: { cluster: ICluster }) {
	return (
		<div className="cluster-list-item">
			<span>{cluster.name}</span>
			<br />
			Created by {cluster.creator_id}
		</div>
	);
}
