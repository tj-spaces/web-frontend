import { joinCluster } from '../../api/api';
import { ICluster } from '../../typings/Cluster';
import Button from '../Button/Button';

export default function ClusterPreview({ cluster }: { cluster: ICluster }) {
	const joinThisCluster = () => {
		joinCluster(cluster.id).then(() => {
			window.location.href = '/clusters/' + cluster.id;
		});
	};

	return (
		<div className="border-radius-bubble background-color-dark-2 padding-2 column-item">
			<a href={'/clusters/' + cluster.id}>
				<h1>{cluster.name}</h1>
			</a>

			<Button className="button button-small background-color-green" onClick={() => joinThisCluster()}>
				JOIN
			</Button>
		</div>
	);
}
