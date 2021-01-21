import React from 'react';
import { createRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createCluster } from '../../api/api';
import Box from '../Box/Box';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Typography from '../Typography/Typography';

export default function ClusterCreateButton() {
	const clusterNameRef = createRef<HTMLInputElement>();
	const visibilityRef = createRef<HTMLSelectElement>();

	const [isClusterCreating, setIsClusterCreating] = useState<boolean>(false);
	const [isClusterCreated, setIsClusterCreated] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [newlyCreatedClusterId, setNewlyCreatedClusterId] = useState<string>();

	function create() {
		if (clusterNameRef.current && visibilityRef.current) {
			const spaceName = clusterNameRef.current.value;
			const visibility = visibilityRef.current.value;
			if (!spaceName) {
				return;
			} else if (visibility !== 'public' && visibility !== 'unlisted') {
				return;
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
		return <Redirect to={`/clusters/${newlyCreatedClusterId}`} />;
	}

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Create Cluster</Button>
			{isOpen && (
				<Modal>
					<Typography type="h1">Create Cluster</Typography>
					<Box display="flex-row">
						<input ref={clusterNameRef} type="text" style={{ flex: 3 }} />
						<select ref={visibilityRef} style={{ flex: 1 }}>
							<option value="public">Public</option>
							<option value="unlisted">Unlisted</option>
						</select>
					</Box>
					<Box display="flex-row">
						{isClusterCreating ? (
							<>
								<Button onClick={() => create()} style={{ flex: 1 }}>
									Create
								</Button>
								<Button onClick={() => setIsOpen(false)} style={{ flex: 1 }}>
									Cancel
								</Button>
							</>
						) : (
							<>Creating...</>
						)}
					</Box>
				</Modal>
			)}
		</>
	);
}
