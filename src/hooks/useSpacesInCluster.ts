import { useEffect, useState } from 'react';
import { getSpacesInCluster } from '../api/api';
import { SpaceSession } from '../typings/SpaceSession';

export default function useSpacesInCluster(clusterId: string) {
	const [spaces, setSpaces] = useState<SpaceSession[]>();

	useEffect(() => {
		getSpacesInCluster(clusterId).then((spaces) => setSpaces(spaces));

		// Reset to empty array
		return () => setSpaces([]);
	}, [clusterId]);

	return spaces;
}
