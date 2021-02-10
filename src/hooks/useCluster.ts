import {useEffect, useState} from 'react';
import {getCluster} from '../api/api';
import {Cluster} from '../typings/Cluster';

export default function useCluster(clusterId: string) {
	const [cluster, setCluster] = useState<Cluster | null>(null);

	useEffect(() => {
		getCluster(clusterId).then((cluster) => {
			setCluster(cluster);
		});
	}, [clusterId]);

	return cluster;
}
