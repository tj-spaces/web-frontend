import React, { createRef, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createSpace } from '../../api/api';
import Box from '../Box/Box';
import Button from '../Button/Button';
import CurrentClusterContext from '../CurrentClusterContext/CurrentClusterContext';
import Typography from '../Typography/Typography';
import Modal from '../Modal/Modal';

export default function SpaceCreateButton() {
	const spaceNameRef = createRef<HTMLInputElement>();

	const cluster = useContext(CurrentClusterContext);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isSpaceCreating, setIsSpaceCreating] = useState<boolean>(false);
	const [isSpaceCreated, setIsSpaceCreated] = useState<boolean>(false);
	const [newlyCreatedSpaceId, setNewlyCreatedSpaceId] = useState<string>();

	function create() {
		if (spaceNameRef.current) {
			const spaceName = spaceNameRef.current.value;
			if (spaceName) {
				setIsSpaceCreating(true);
				createSpace(cluster.id!, spaceName).then((newSpaceId) => {
					setNewlyCreatedSpaceId(newSpaceId);
					setIsSpaceCreated(true);
				});
			}
		}
	}

	if (isSpaceCreated && newlyCreatedSpaceId) {
		return <Redirect to={`/clusters/${cluster}/spaces/${newlyCreatedSpaceId}`} />;
	}

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Create Space</Button>
			{isOpen && (
				<Modal>
					<Typography type="h1">Create Space</Typography>
					<Box display="flex-row">
						<input ref={spaceNameRef} type="text" style={{ flex: 3 }} />
					</Box>
					<Box display="flex-row">
						{!isSpaceCreating ? (
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
