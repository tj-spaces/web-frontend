import { Link } from 'react-router-dom';
import { joinCluster } from '../api/api';
import { Cluster } from '../typings/Cluster';
import BaseButton from './Base/BaseButton';
import BaseRow from './Base/BaseRow';
import BaseText from './Base/BaseText';

export default function ClusterPreview({ cluster }: { cluster: Cluster }) {
	const joinThisCluster = () => {
		joinCluster(cluster.id).then(() => {
			window.location.href = '/clusters/' + cluster.id;
		});
	};

	return (
		<BaseRow direction="column" borderRadius={1} backgroundColor="dark2" rails={2} spacing={1} edges={1} boxShadow>
			<BaseText fontSize="large" fontWeight="bold">
				<Link to={'/spaces/' + cluster.id}>{cluster.name}</Link>
			</BaseText>

			<BaseButton size="small" variant="positive" onClick={() => joinThisCluster()}>
				Join
			</BaseButton>
		</BaseRow>
	);
}