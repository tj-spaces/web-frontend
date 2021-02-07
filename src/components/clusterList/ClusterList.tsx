import {Cluster} from '../../typings/Cluster';
import BaseRow from '../Base/BaseRow';
import ClusterListRow from './ClusterListRow';

/**
 * Shows a list of the clusters you've joined, sorted by whichever has the most activity.
 * Each child of this list is a <ClusterListRow/>.
 */
export default function ClusterList({clusters}: {clusters: Cluster[]}) {
	return (
		<BaseRow direction="column" spacing={1}>
			{clusters.map((cluster) => (
				<ClusterListRow key={cluster.id} cluster={cluster} />
			))}
		</BaseRow>
	);
}
