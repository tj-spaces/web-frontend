import { useEffect, useState } from 'react';
import { getMyClusters } from '../api/api';
import { ICluster } from '../typings/Cluster';

export default function useMyClusters() {
	const [spaces, setClusters] = useState<ICluster[]>();

	useEffect(() => {
		getMyClusters().then((clusters) => setClusters(clusters));
	}, []);

	return spaces;
}
