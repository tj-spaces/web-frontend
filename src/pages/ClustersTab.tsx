/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useEffect, useState} from 'react';
import {getMyClusters} from '../api/clusters';
import {FetchStatus} from '../api/FetchStatus';
import Awaiting from '../components/Awaiting';
import BaseRow from '../components/base/BaseRow';
import CreateClusterButton from '../components/CreateClusterButton';
import ClusterFeedItem from '../components/feed/ClusterFeedItem';
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
		<BaseRow direction="column" spacing={1}>
			<BaseRow direction="row" justifyContent="center" width="100%">
				<CreateClusterButton />
			</BaseRow>

			<Awaiting fetchStatus={fetchStatus}>
				{clusters.map((cluster) => (
					<ClusterFeedItem cluster={cluster} joined />
				))}
			</Awaiting>
		</BaseRow>
	);
}
