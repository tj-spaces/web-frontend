import React from 'react';
import { createRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createCluster } from '../../../api/api';
import Box from '../../Box/Box';
import Button from '../../Button/Button';
import Modal from '../../Modal/Modal';

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
			<h1 onClick={() => setIsOpen(true)}>+</h1>
			{isOpen && (
				<Modal>
					<h1>Create Cluster</h1>
					<Box variant="buttonRow">
						<span className="margin-right-2">Name</span>{' '}
						<input ref={clusterNameRef} type="text" style={{ flex: 3 }} />
					</Box>
					<Box variant="buttonRow">
						<span className="margin-right-2">Visibility</span>{' '}
						<select ref={visibilityRef} style={{ flex: 1 }}>
							<option value="public">Public</option>
							<option value="unlisted">Unlisted</option>
						</select>
					</Box>
					<Box variant="buttonRow">
						{!isClusterCreating ? (
							<>
								<Button
									onClick={() => create()}
									className="button button-medium margin-right-2"
									style={{ flex: 1 }}
								>
									Create
								</Button>
								<Button
									onClick={() => setIsOpen(false)}
									className="button button-medium margin-left-2"
									style={{ flex: 1 }}
								>
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
