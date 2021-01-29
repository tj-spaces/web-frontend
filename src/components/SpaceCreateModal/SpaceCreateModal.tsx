import React, { createRef, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createSpace } from '../../api/api';
import Button from '../BaseButton/BaseButton';
import BaseRow from '../BaseRow/BaseRow';
import Typography from '../BaseText/BaseText';
import BaseTextInput from '../BaseTextInput/BaseTextInput';
import CurrentClusterContext from '../Cluster/CurrentClusterContext/CurrentClusterContext';
import Modal from '../Modal/Modal';

export default function SpaceCreateModal({ onClose }: { onClose: () => void }) {
	const spaceNameRef = createRef<HTMLInputElement>();
	const [isSpaceCreating, setIsSpaceCreating] = useState<boolean>(false);
	const [isSpaceCreated, setIsSpaceCreated] = useState<boolean>(false);
	const [newlyCreatedSpaceId, setNewlyCreatedSpaceId] = useState<string>();

	const cluster = useContext(CurrentClusterContext);

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
		return <Redirect to={`/clusters/${cluster.id}/spaces/${newlyCreatedSpaceId}`} />;
	}

	return (
		<Modal onClickOutside={() => onClose()}>
			<BaseRow direction="column" spacing={2} rails={2}>
				<Typography variant="heading" fontSize="large" alignment="center">
					Create a Space
				</Typography>
				<div>
					<Typography variant="caption" fontSize="small">
						Name
					</Typography>
					<br />
					<BaseTextInput ref={spaceNameRef} fontSize="xxl" style={{ width: '100%' }} />
				</div>
				{!isSpaceCreating ? (
					<Button size="small" onClick={() => create()}>
						Create
					</Button>
				) : (
					'Creating...'
				)}
			</BaseRow>
		</Modal>
	);
}
