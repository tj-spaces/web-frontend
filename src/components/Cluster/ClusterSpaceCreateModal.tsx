import React, { createRef, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createSpaceSessionInCluster } from '../../api/api';
import BaseButton from '../Base/BaseButton';
import BaseModal from '../Base/BaseModal';
import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';
import BaseTextInput from '../Base/BaseTextInput';
import ClusterIDContext from '../Cluster/CurrentClusterContext';

export default function SpaceCreateModal({ onClose }: { onClose: () => void }) {
	const topicRef = createRef<HTMLInputElement>();
	const [isSpaceCreating, setIsSpaceCreating] = useState<boolean>(false);
	const [isSpaceCreated, setIsSpaceCreated] = useState<boolean>(false);
	const [newlyCreatedSpaceId, setNewlyCreatedSpaceId] = useState<string>();

	const cluster = useContext(ClusterIDContext);

	function create() {
		if (topicRef.current) {
			const topic = topicRef.current.value;
			if (topic) {
				setIsSpaceCreating(true);
				createSpaceSessionInCluster(cluster.id!, topic).then((newSpaceId) => {
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
						Topic
					</BaseText>
					<br />
					<BaseTextInput ref={topicRef} fontSize="xxl" style={{ width: '100%' }} />
				</div>
				{!isSpaceCreating ? (
					<BaseButton size="small" onClick={() => create()}>
						Create
					</BaseButton>
				) : (
					'Creating...'
				)}
			</BaseRow>
		</BaseModal>
	);
}
