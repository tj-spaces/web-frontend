import {useEffect, useState} from 'react';
import {getMyClusters} from '../../api/api';
import {FetchStatus} from '../../api/FetchStatus';
import {Cluster} from '../../typings/Cluster';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import ClusterList from '../clusterList/ClusterList';

/**
 * Controller that subscribes to cluster activity and renders it under the header "Clusters"
 */
export default function ClusterSection() {
	let [clusters, setClusters] = useState<Cluster[]>([]);
	let [fetchStatus, setFetchStatus] = useState<FetchStatus>(null);

	useEffect(() => {
		setFetchStatus('loading');
		getMyClusters()
			.then((clusters) => {
				setClusters(clusters);
				setFetchStatus('loaded');
			})
			.catch((err) => {
				setFetchStatus('errored');
			});
	}, []);

	return (
		<BaseRow direction="column">
			<BaseText variant="secondary-title">Clusters</BaseText>
			{fetchStatus === 'loaded' ? (
				<ClusterList clusters={clusters} />
			) : fetchStatus === 'errored' ? (
				'Error'
			) : (
				'Loading'
			)}
		</BaseRow>
	);
}
