import React, { createRef, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createSpace } from '../../api/api';
import Button from '../BaseButton/BaseButton';
import BaseRow from '../BaseRow/BaseRow';
import BaseText from '../BaseText/BaseText';
import BaseTextInput from '../BaseTextInput/BaseTextInput';
import CurrentClusterContext from '../Cluster/CurrentClusterContext/CurrentClusterContext';
import BaseModal from '../BaseModal/BaseModal';

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
		<BaseModal onClickOutside={() => onClose()}>
			<BaseRow direction="column" spacing={2} rails={2}>
				<BaseText variant="heading" fontSize="large" alignment="center">
					Create a Space
				</BaseText>
				<div>
					<BaseText variant="caption" fontSize="small">
						Name
					</BaseText>
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
		</BaseModal>
	);
}
