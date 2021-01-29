import React from 'react';
import { createRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createCluster } from '../../../api/api';
import Button from '../../BaseButton/BaseButton';
import Modal from '../../Modal/Modal';
import BaseRow from '../../BaseRow/BaseRow';

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
				<Modal onClickOutside={() => setIsOpen(false)}>
					<h1>Create Cluster</h1>
					<BaseRow direction="row" spacing={1} rails={1}>
						<span className="margin-right-2">Name</span>{' '}
						<input ref={clusterNameRef} type="text" style={{ flex: 3 }} />
					</BaseRow>
					<BaseRow direction="row" spacing={1} rails={1}>
						<span className="margin-right-2">Visibility</span>{' '}
						<select ref={visibilityRef} style={{ flex: 1 }}>
							<option value="public">Public</option>
							<option value="unlisted">Unlisted</option>
						</select>
					</BaseRow>
					<BaseRow direction="row" spacing={1} rails={1}>
						{!isClusterCreating ? (
							<>
								<Button onClick={() => create()} size="medium" style={{ flex: 1 }}>
									Create
								</Button>
								<Button onClick={() => setIsOpen(false)} size="medium" style={{ flex: 1 }}>
									Cancel
								</Button>
							</>
						) : (
							<>Creating...</>
						)}
					</BaseRow>
				</Modal>
			)}
		</>
	);
}
