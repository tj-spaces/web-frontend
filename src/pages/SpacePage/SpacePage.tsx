import { useParams } from 'react-router-dom';
import useSpace from '../../hooks/useSpace';
import Space from '../../components/Space/Space';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import ClusterIdContext from '../../components/ClusterIdContext/ClusterIdContext';
import React from 'react';
import Box from '../../components/Box/Box';

export default function SpacePage() {
	const { spaceId, clusterId } = useParams<{ clusterId: string; spaceId: string }>();
	const space = useSpace(spaceId);

	if (!space) {
		return <LoadingScreen />;
	}

	return (
		<ClusterIdContext.Provider value={clusterId}>
			<Box display="flex-column" width="50%" margin="x-auto">
				<Space space={space} />
			</Box>
		</ClusterIdContext.Provider>
	);
}
