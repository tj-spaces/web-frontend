import { useEffect, useState } from 'react';
import { getFriendsList, getIncomingFriendRequests } from '../../api/api';
import { PublicUserInfo } from '../../typings/PublicUserInfo';
import AddFriendsPressableText from '../addFriends/AddFriendsPressableText';
import BaseModal from '../Base/BaseModal';
import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';
import IncomingFriendRequestsList from '../incomingFriendRequests/IncomingFriendRequestsList';
import FriendListRow from './FriendListRow';

export default function FriendList() {
	let [friendsPagingAfter, setFriendPagingAfter] = useState<string>('0');
	let [friends, setFriends] = useState<PublicUserInfo[]>([]);
	let [incomingFriendRequests, setIncomingFriendRequests] = useState<PublicUserInfo[]>([]);
	let [incomingFriendRequestsModalOpen, setIncomingFriendRequestsModalOpen] = useState(false);

	useEffect(() => {
		if (friendsPagingAfter != null) {
			getFriendsList(friendsPagingAfter).then(({ data, paging }) => {
				setFriends((friends) => friends.concat(data));
				setFriendPagingAfter(paging.after);
			});
		}
	}, [friendsPagingAfter]);

	useEffect(() => {
		getIncomingFriendRequests().then((requests) => {
			setIncomingFriendRequests(requests);
		});
	}, []);

	return (
		<BaseRow direction="column" alignment="center" spacing={1} edges={1}>
			<BaseRow direction="row" alignment="center" spacing={1}>
				<BaseText fontSize="xl" fontWeight="bold">
					Friends
				</BaseText>
				<AddFriendsPressableText />
			</BaseRow>
			{incomingFriendRequests.length > 0 ? (
				<>
					<BaseText>People sent you friend requests!</BaseText>
					<BaseText
						fontWeight="bold"
						onClick={() => {
							setIncomingFriendRequestsModalOpen(true);
						}}
					>
						Open them
					</BaseText>
					{incomingFriendRequestsModalOpen && (
						<BaseModal onClickOutside={() => setIncomingFriendRequestsModalOpen(false)}>
							<BaseText variant="heading" fontSize="large" fontWeight="bold">
								Friend Requests
							</BaseText>
							<IncomingFriendRequestsList requests={incomingFriendRequests} />
						</BaseModal>
					)}
				</>
			) : null}
			{friends.map((friend) => (
				<FriendListRow friend={friend} key={friend.id} />
			))}
		</BaseRow>
	);
}
