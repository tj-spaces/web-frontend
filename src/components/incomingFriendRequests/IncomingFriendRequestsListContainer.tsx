import {useEffect, useState} from 'react';
import {getIncomingFriendRequests} from '../../api/friends';
import {getLogger} from '../../lib/ClusterLogger';
import {PublicUserInfo} from '../../typings/PublicUserInfo';
import BaseModal from '../base/BaseModal';
import BaseText from '../base/BaseText';
import IncomingFriendRequestsList from './IncomingFriendRequestsList';

const logger = getLogger('loader/incoming-friend-requests');

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
			logger.debug({event: 'Loaded friend requests', data: requests});
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
					<BaseModal onClose={() => setIncomingFriendRequestsModalOpen(false)}>
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
