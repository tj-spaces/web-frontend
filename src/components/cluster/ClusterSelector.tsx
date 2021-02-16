import {useEffect, useState} from 'react';
import {getMyClusters} from '../../api/clusters';
import {Cluster} from '../../typings/Cluster';

export default function ClusterSelector() {
	const [clusters, setClusters] = useState<Cluster[]>([]);

	useEffect(() => {
		getMyClusters().then((clusters) => setClusters(clusters));
	}, []);

	return (
		<select onChange={(ev) => ev.target.value}>
			{clusters.map((cluster) => {
				return (
					<option key={cluster.id} value={cluster.id}>
						{cluster.name}
					</option>
				);
			})}
		</select>
	);
}
