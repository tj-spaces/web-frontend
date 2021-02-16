import {useEffect, useState} from 'react';
import {getSpaceSessionsInCluster} from '../api/api';
import {Space} from '../typings/Space';

export default function useSpacesInCluster(clusterID: string) {
	const [spaces, setSpaces] = useState<Space[]>();

	useEffect(() => {
		getSpaceSessionsInCluster(clusterID).then((spaces) => setSpaces(spaces));

		// Reset to empty array
		return () => setSpaces(undefined);
	}, [clusterID]);

	return spaces;
}
