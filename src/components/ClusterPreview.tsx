import { Link } from 'react-router-dom';
import { joinCluster } from '../api/api';
import { Cluster } from '../typings/Cluster';
import BaseButton from './Base/BaseButton';
import BaseCard from './Base/BaseCard';

export default function ClusterPreview({ cluster }: { cluster: Cluster }) {
	const joinThisCluster = () => {
		joinCluster(cluster.id).then(() => {
			window.location.href = '/clusters/' + cluster.id;
		});
	};

	return (
		<BaseCard backgroundColor="dark">
			<Link to={'/clusters/' + cluster.id}>
				<h1>{cluster.name}</h1>
			</Link>

			<BaseButton size="small" variant="positive" onClick={() => joinThisCluster()}>
				JOIN
			</BaseButton>
		</BaseCard>
	);
}
