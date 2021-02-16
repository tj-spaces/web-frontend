import {useEffect, useState} from 'react';
import {getMyClusters} from '../../api/clusters';
import {FetchStatus} from '../../api/FetchStatus';
import Awaiting from '../../components/Awaiting';
import BaseText from '../../components/base/BaseText';
import ClusterList from '../../components/clusterList/ClusterList';
import {Cluster} from '../../typings/Cluster';

export default function ClustersTab() {
	let [clusters, setClusters] = useState<Cluster[]>([]);
	let [fetchStatus, setFetchStatus] = useState<FetchStatus>(null);

	useEffect(() => {
		setFetchStatus('loading');
		getMyClusters()
			.then((clusters) => {
				setClusters(clusters);
				setFetchStatus('loaded');
			})
			.catch((error) => {
				setFetchStatus('errored');
			});
	}, []);

	return (
		<>
			<BaseText variant="primary-title" alignment="center">
				Clusters
			</BaseText>
			<Awaiting fetchStatus={fetchStatus}>
				<ClusterList clusters={clusters} />
			</Awaiting>
		</>
	);
}
