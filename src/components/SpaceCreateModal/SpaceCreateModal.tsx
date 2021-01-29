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
			<div style={{ padding: '1em' }}>
				<Typography variant="heading" fontSize="large" alignment="center">
					Create a Space
				</Typography>
				<Typography variant="base" fontSize="small">
					Name
				</Typography>
				<br />
				<BaseTextInput ref={spaceNameRef} style={{ flex: 3 }} />
				<BaseRow direction="row" spacing={1} rails={1}>
					{!isSpaceCreating ? (
						<Button size="small" onClick={() => create()} style={{ flex: 1 }}>
							Create
						</Button>
					) : (
						'Creating...'
					)}
				</BaseRow>
			</div>
		</Modal>
	);
}
