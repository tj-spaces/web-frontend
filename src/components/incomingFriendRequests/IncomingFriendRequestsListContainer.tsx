import React, {useEffect, useState} from 'react';
import {getIncomingFriendRequests} from '../../api/api';
import {PublicUserInfo} from '../../typings/PublicUserInfo';
import BaseModal from '../base/BaseModal';
import BaseText from '../base/BaseText';
import IncomingFriendRequestsList from './IncomingFriendRequestsList';

export default function IncomingFriendRequestsListContainer() {
	let [incomingFriendRequests, setIncomingFriendRequests] = useState<
		PublicUserInfo[]
	>([]);

	let [
		incomingFriendRequestsModalOpen,
		setIncomingFriendRequestsModalOpen,
	] = useState(false);

	useEffect(() => {
		getIncomingFriendRequests().then((requests) => {
			console.log('Loaded friend requests: ', requests);
			setIncomingFriendRequests(requests);
		});
	}, []);

	if (incomingFriendRequests.length > 0) {
		return (
			<>
				<BaseText>People sent you friend requests!</BaseText>
				<BaseText
					variant="body-bold"
					onClick={() => {
						setIncomingFriendRequestsModalOpen(true);
					}}
				>
					Open them
				</BaseText>
				{incomingFriendRequestsModalOpen && (
					<BaseModal
						onClickOutside={() => setIncomingFriendRequestsModalOpen(false)}
					>
						<BaseText variant="secondary-title">Friend Requests</BaseText>
						<IncomingFriendRequestsList requests={incomingFriendRequests} />
					</BaseModal>
				)}
			</>
		);
	} else {
		return null;
	}
}
