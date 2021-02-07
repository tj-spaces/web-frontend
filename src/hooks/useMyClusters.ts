import { useEffect, useState } from 'react';
import { getMyClusters } from '../api/api';
import { Cluster } from '../typings/Cluster';

export default function useMyClusters() {
	const [spaces, setClusters] = useState<Cluster[]>();

	useEffect(() => {
		getMyClusters().then((clusters) => setClusters(clusters));
	}, []);

	return spaces;
}
