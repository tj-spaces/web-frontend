import { useEffect, useState } from 'react';
import { getDiscoverableClusters } from '../../api/api';
import { Cluster } from '../../typings/Cluster';
import ClusterPreview from '../../components/ClusterFeedItem';
import BaseText from '../../components/Base/BaseText';
import BaseRow from '../../components/Base/BaseRow';

export default function ClusterExplorer() {
	const [clusters, setClusters] = useState<Cluster[]>();

	useEffect(() => {
		getDiscoverableClusters().then((clusters) => {
			setClusters(clusters);
		});
	}, []);

	return (
		<BaseRow direction="column" centerSelf width="100%" overflow="auto" spacing={1}>
			<BaseText variant="heading" fontSize="xl" fontWeight="bold">
				Explore
			</BaseText>

			{clusters != null ? (
				clusters.map((cluster) => <ClusterPreview cluster={cluster} key={cluster.id} />)
			) : (
				<span>Loading...</span>
			)}
		</BaseRow>
	);
}
