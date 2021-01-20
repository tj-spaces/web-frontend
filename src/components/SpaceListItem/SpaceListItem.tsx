import { useContext } from 'react';
import CurrentClusterContext from '../ClusterCurrentClusterContext/ClusterCurrentClusterContext';

export default function SpaceListItem({ id, name }: { id: string; name: string }) {
	const clusterId = useContext(CurrentClusterContext);

	return (
		<div>
			<a href={`/cluster/${clusterId}/space/${id}`}>{name}</a>
		</div>
	);
}
