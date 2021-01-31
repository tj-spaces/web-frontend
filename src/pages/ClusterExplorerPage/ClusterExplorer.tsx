import { useEffect, useState } from 'react';
import { getDiscoverableClusters } from '../../api/api';
import { createStylesheet } from '../../styles/createStylesheet';
import { ICluster } from '../../typings/Cluster';
import ClusterPreview from './ClusterPreview';
import BaseText from '../../components/Base/BaseText';
import BaseRow from '../../components/Base/BaseRow';

export const styles = createStylesheet({
	clusterExplorer: {
		display: 'flex',
		flexDirection: 'column',
		padding: '2em',
		overflowY: 'scroll',
		width: '100%'
	}
});

export default function ClusterExplorer() {
	const [clusters, setClusters] = useState<ICluster[]>();

	useEffect(() => {
		getDiscoverableClusters().then((clusters) => {
			setClusters(clusters);
		});
	}, []);

	return (
		<BaseRow direction="column" rails="auto" width="100%" overflow="auto" spacing={1}>
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
