import React from 'react';
import useMyClusters from '../../hooks/useMyClusters';
import ClusterCreateButton from '../ClusterCreateButton/ClusterCreateButton';
import ClusterList from '../ClusterList/ClusterList';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import Typography from '../Typography/Typography';

export default function ClustersJoinedByMe() {
	const myClusters = useMyClusters();

	if (myClusters == null) {
		return <LoadingScreen />;
	}

	return (
		<div>
			<Typography alignment="center" type="title">
				My Clusters
			</Typography>
			<ClusterCreateButton />
			<ClusterList clusters={myClusters} />
		</div>
	);
}
