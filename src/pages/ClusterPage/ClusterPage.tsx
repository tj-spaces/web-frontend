import { useParams } from 'react-router-dom';
import Cluster from '../../components/Cluster/Cluster';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import useCluster from '../../hooks/useCluster';

export default function ClusterPage() {
	const { clusterId } = useParams<{ clusterId: string }>();
	const cluster = useCluster(clusterId);

	if (cluster == null) {
		return <LoadingScreen />;
	}

	document.title = cluster.name + ' | Cluster';

	return <Cluster id={clusterId} name={cluster.name} creatorId={cluster.creator_id} />;
}
