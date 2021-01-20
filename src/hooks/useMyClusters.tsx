import { useEffect, useState } from 'react';
import { getMyClusters } from '../api/api';
import { ICluster } from '../typings/Cluster';

export default function useMyClusters() {
	const [spaces, setSpaces] = useState<ICluster[]>();

	useEffect(() => {
		getMyClusters().then((spaces) => setSpaces(spaces));
	}, []);

	return spaces;
}
