import { useEffect, useState } from 'react';
import { getDiscoverableClusters } from '../../api/api';
import { createStylesheet } from '../../styles/createStylesheet';
import { ICluster } from '../../typings/Cluster';
import ClusterPreview from '../ClusterPreview/ClusterPreview';
import Typography from '../Typography/Typography';

export const styles = createStylesheet({
	clusterExplorer: {
		display: 'flex',
		flexDirection: 'column',
		padding: '2em',
		overflowY: 'scroll'
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
		<div className={styles.clusterExplorer}>
			<Typography type="title">Explore</Typography>

			{clusters != null ? (
				clusters.map((cluster) => <ClusterPreview cluster={cluster} />)
			) : (
				<span>Loading...</span>
			)}
		</div>
	);
}
