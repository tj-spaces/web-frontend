import { createRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createCluster } from '../../api/api';

export default function ClusterCreateButton() {
	const clusterNameRef = createRef<HTMLInputElement>();
	const visibilityRef = createRef<HTMLSelectElement>();

	const [isClusterCreating, setIsClusterCreating] = useState<boolean>(false);
	const [isClusterCreated, setIsClusterCreated] = useState<boolean>(false);
	const [newlyCreatedClusterId, setNewlyCreatedClusterId] = useState<string>();

	function create() {
		if (clusterNameRef.current && visibilityRef.current) {
			const spaceName = clusterNameRef.current.value;
			const visibility = visibilityRef.current.value;

			if (visibility !== 'public' && visibility !== 'unlisted') {
				alert('Please choose a different visibility option');
			} else {
				setIsClusterCreating(true);
				createCluster(spaceName, visibility).then((newClusterId) => {
					setNewlyCreatedClusterId(newClusterId);
					setIsClusterCreated(true);
				});
			}
		}
	}

	if (isClusterCreated && newlyCreatedClusterId) {
		return <Redirect to={`/cluster/${newlyCreatedClusterId}`} />;
	}

	return (
		<div>
			{isClusterCreating ? (
				<span>Creating cluster...</span>
			) : (
				<>
					<input ref={clusterNameRef} type="text"></input>
					<select ref={visibilityRef}>
						<option value="public">Public</option>
						<option value="unlisted">Unlisted</option>
					</select>
					<button onClick={() => create()}>Create A Cluster</button>
				</>
			)}
		</div>
	);
}
