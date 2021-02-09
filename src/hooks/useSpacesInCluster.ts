import {useEffect, useState} from 'react';
import {getSpaceSessionsInCluster} from '../api/api';
import {SpaceSession} from '../typings/Space';

export default function useSpacesInCluster(clusterID: string) {
	const [spaces, setSpaces] = useState<SpaceSession[]>();

	useEffect(() => {
		getSpaceSessionsInCluster(clusterID).then((spaces) => setSpaces(spaces));

		// Reset to empty array
		return () => setSpaces(undefined);
	}, [clusterID]);

	return spaces;
}
