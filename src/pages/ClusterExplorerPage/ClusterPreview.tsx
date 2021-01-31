import { Link } from 'react-router-dom';
import { joinCluster } from '../../api/api';
import { ICluster } from '../../typings/Cluster';
import Button from '../../components/Base/BaseButton';
import BaseCard from '../../components/Base/BaseCard';

export default function ClusterPreview({ cluster }: { cluster: ICluster }) {
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

			<Button size="small" variant="positive" onClick={() => joinThisCluster()}>
				JOIN
			</Button>
		</BaseCard>
	);
}
