import { Link } from 'react-router-dom';
import { joinCluster } from '../../api/api';
import { ICluster } from '../../typings/Cluster';
import Box from '../Box/Box';
import Button from '../BaseButton/BaseButton';

export default function ClusterPreview({ cluster }: { cluster: ICluster }) {
	const joinThisCluster = () => {
		joinCluster(cluster.id).then(() => {
			window.location.href = '/clusters/' + cluster.id;
		});
	};

	return (
		<Box variant="card">
			<Link to={'/clusters/' + cluster.id}>
				<h1>{cluster.name}</h1>
			</Link>

			<Button size="small" variant="positive" onClick={() => joinThisCluster()}>
				JOIN
			</Button>
		</Box>
	);
}
