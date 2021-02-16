import {useEffect, useState} from 'react';
import {getSpacesInCluster} from '../api/spaces';
import {Space} from '../typings/Space';

export default function useSpacesInCluster(clusterID: string) {
	const [spaces, setSpaces] = useState<Space[]>();

	useEffect(() => {
		getSpacesInCluster(clusterID).then((spaces) => setSpaces(spaces));

		// Reset to empty array
		return () => setSpaces(undefined);
	}, [clusterID]);

	return spaces;
}
