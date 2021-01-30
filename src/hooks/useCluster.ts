import { useEffect, useState } from 'react';
import { getCluster } from '../api/api';
import { ICluster } from '../typings/Cluster';

export default function useCluster(clusterId: string) {
	const [cluster, setCluster] = useState<ICluster>();

	useEffect(() => {
		getCluster(clusterId).then((cluster) => {
			setCluster(cluster);
		});
	}, [clusterId]);

	return cluster;
}
