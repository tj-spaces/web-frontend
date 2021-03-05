import {Link} from 'react-router-dom';
import {joinCluster} from '../../api/clusters';
import {Cluster} from '../../typings/Cluster';
import BaseButton from '../base/BaseButton';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';

export default function ClusterPreview({cluster}: {cluster: Cluster}) {
	const joinThisCluster = () => {
		joinCluster(cluster.id).then(() => {
			window.location.href = '/clusters/' + cluster.id;
		});
	};

	return (
		<BaseRow
			direction="column"
			borderRadius={1}
			backgroundColor="bgElevated"
			rails={2}
			spacing={1}
			edges={2}
			boxShadow
			width="30rem"
		>
			<BaseText variant="list-item-title">
				<Link to={'/clusters/' + cluster.id}>{cluster.name}</Link>
			</BaseText>

			<BaseButton
				size="small"
				variant="theme"
				onClick={() => joinThisCluster()}
			>
				Join
			</BaseButton>
		</BaseRow>
	);
}