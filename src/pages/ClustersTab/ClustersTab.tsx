import {useEffect, useState} from 'react';
import {getMyClusters} from '../../api/api';
import {FetchStatus} from '../../api/FetchStatus';
import BaseText from '../../components/base/BaseText';
import ClusterList from '../../components/clusterList/ClusterList';
import {Cluster} from '../../typings/Cluster';

export default function ClustersTab() {
	let [clusters, setClusters] = useState<Cluster[]>([]);
	let [fetchStatus, setFetchStatus] = useState<FetchStatus>(null);

	useEffect(() => {
		getMyClusters().then((clusters) => setClusters(clusters));
	}, []);
	return (
		<>
			<BaseText variant="primary-title" alignment="center">
				Clusters
			</BaseText>
			<ClusterList clusters={clusters} />
		</>
	);
}
