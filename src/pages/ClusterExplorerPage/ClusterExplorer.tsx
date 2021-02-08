import {useEffect, useState} from 'react';
import {getDiscoverableClusters} from '../../api/api';
import {Cluster} from '../../typings/Cluster';
import ClusterPreview from '../../components/feed/ClusterFeedItem';
import BaseText from '../../components/Base/BaseText';
import BaseRow from '../../components/Base/BaseRow';

/**
 * Renders suggested clusters for you to discover.
 * This may be replaced by a hybrid explore page that merges both spaces and clusters.
 */
export default function ClusterExplorer() {
	const [clusters, setClusters] = useState<Cluster[]>();

	useEffect(() => {
		getDiscoverableClusters().then((clusters) => {
			setClusters(clusters);
		});
	}, []);

	return (
		<BaseRow
			direction="column"
			centerSelf
			width="100%"
			overflow="auto"
			spacing={1}
		>
			<BaseText variant="secondary-title">Explore</BaseText>

			{clusters != null
				? clusters.map((cluster) => (
						<ClusterPreview cluster={cluster} key={cluster.id} />
				  ))
				: 'Loading...'}
		</BaseRow>
	);
}
