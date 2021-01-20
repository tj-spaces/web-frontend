import { useEffect, useState } from 'react';
import { getSpacesInCluster } from '../api/api';
import { ISpace } from '../typings/Space';

export default function useSpacesInCluster(clusterId: string) {
	const [spaces, setSpaces] = useState<ISpace[]>();

	useEffect(() => {
		getSpacesInCluster(clusterId).then((spaces) => setSpaces(spaces));
	}, [clusterId]);

	return spaces;
}
