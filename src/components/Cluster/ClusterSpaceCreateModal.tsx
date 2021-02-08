import React, {createRef, useContext, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {createSpaceSessionInCluster} from '../../api/api';
import BaseButton from '../base/BaseButton';
import BaseModal from '../base/BaseModal';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import BaseTextInput from '../base/BaseTextInput';
import ClusterIDContext from './CurrentClusterContext';

export default function SpaceCreateModal({onClose}: {onClose: () => void}) {
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
		return (
			<Redirect to={`/clusters/${cluster.id}/spaces/${newlyCreatedSpaceId}`} />
		);
	}

	return (
		<BaseModal onClickOutside={() => onClose()}>
			<BaseRow direction="column" spacing={2} rails={2}>
				<BaseText variant="secondary-title" alignment="center">
					Create a Space
				</BaseText>
				<div>
					<BaseText variant="caption">Topic</BaseText>
					<br />
					<BaseTextInput
						ref={topicRef}
						fontSize="section-title"
						style={{width: '100%'}}
					/>
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
