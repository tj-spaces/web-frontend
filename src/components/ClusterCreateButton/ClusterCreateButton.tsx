import React from 'react';
import { createRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createCluster } from '../../api/api';
import Box from '../Box/Box';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';

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
		<Box display="flex-row" className="font-size-lg" justifyContent="space-between">
			{isClusterCreating ? (
				<Typography type="compact">Loading...</Typography>
			) : (
				<>
					<input ref={clusterNameRef} type="text" style={{ flex: 3, marginRight: '0.25em' }} />
					<select ref={visibilityRef} style={{ flex: 1, margin: '0 0.25em' }}>
						<option value="public">Public</option>
						<option value="unlisted">Unlisted</option>
					</select>
					<Button onClick={() => create()} style={{ flex: 1, marginLeft: '0.25em' }}>
						Create
					</Button>
				</>
			)}
		</Box>
	);
}
