import {Cluster} from '../../typings/Cluster';
import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';

/**
 * A row to describe a Cluster, for example in the most recently active clusters list.
 * This contains the name of the cluster, which when clicked will lead to the cluster page.
 * It also displays when the cluster was most recently active, how many messages were sent
 * in the past day, and more.
 */
export default function ClusterListRow({cluster}: {cluster: Cluster}) {
	return (
		<BaseRow
			direction="column"
			borderRadius={1}
			backgroundColor="dark0"
			alignment="center"
		>
			<BaseText variant="heading" fontSize="large">
				{cluster.name}
			</BaseText>
		</BaseRow>
	);
}
