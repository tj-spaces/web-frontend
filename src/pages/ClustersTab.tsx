import {useEffect, useState} from 'react';
import {getMyClusters} from '../api/clusters';
import {FetchStatus} from '../api/FetchStatus';
import Awaiting from '../components/Awaiting';
import ClusterList from '../components/clusterList/ClusterList';
import CreateClusterButton from '../components/CreateClusterButton';
import {Cluster} from '../typings/Cluster';

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
			<CreateClusterButton />
			<Awaiting fetchStatus={fetchStatus}>
				<ClusterList clusters={clusters} />
			</Awaiting>
		</>
	);
}
