import { useEffect, useState } from 'react';
import { getDiscoverableClusters } from '../../api/api';
import { ICluster } from '../../typings/Cluster';
import ClusterPreview from '../ClusterPreview/ClusterPreview';
import Typography from '../Typography/Typography';

export default function ClusterExplorer() {
	const [clusters, setClusters] = useState<ICluster[]>();

	useEffect(() => {
		getDiscoverableClusters().then((clusters) => {
			setClusters(clusters);
		});
	}, []);

	return (
		<div className="flex-column padding-2">
			<Typography type="title">Explore</Typography>

			{clusters != null ? (
				clusters.map((cluster) => <ClusterPreview cluster={cluster} />)
			) : (
				<span>Loading...</span>
			)}
		</div>
	);
}
