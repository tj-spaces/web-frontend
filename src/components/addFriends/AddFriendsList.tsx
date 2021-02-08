import React, {useState} from 'react';
import {sendFriendRequest} from '../../api/api';
import {PublicUserInfo} from '../../typings/PublicUserInfo';
import BaseRow from '../base/BaseRow';
import AddFriendsListRow from './AddFriendsListRow';

export default function AddFriendsList({
	suggestedFriends,
}: {
	suggestedFriends: PublicUserInfo[];
}) {
	const [requestedFriends, setRequestedFriends] = useState<
		Record<string, boolean>
	>({});

	return (
		<BaseRow direction="column" height="16rem">
			{suggestedFriends.map((friend) => {
				return (
					<AddFriendsListRow
						friend={friend}
						onClickedAddFriend={() => {
							sendFriendRequest(friend.id);
							setRequestedFriends((requestedFriends) => ({
								...requestedFriends,
								[friend.id]: true,
							}));
						}}
						key={friend.id}
						requested={requestedFriends[friend.id] === true}
					/>
				);
			})}
		</BaseRow>
	);
}
