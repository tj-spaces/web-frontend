/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
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
