import { useEffect, useState } from 'react';
import { getSpacesInCluster } from '../api/api';
import { ISpace } from '../typings/Space';

export default function useSpacesInCluster(clusterId: string) {
	const [spaces, setSpaces] = useState<ISpace[]>();

	useEffect(() => {
		getSpacesInCluster(clusterId).then((spaces) => setSpaces(spaces));

		// Reset to empty array
		return () => setSpaces([]);
	}, [clusterId]);

	return spaces;
}
