import React from 'react';
import AddFriendsPressableText from '../components/addFriends/AddFriendsPressableText';
import FriendActivity from '../components/friendActivity/FriendActivity';
import IncomingFriendRequestsListContainer from '../components/incomingFriendRequests/IncomingFriendRequestsListContainer';

/**
 * Renders a tab where you can see which friends are online
 */
export default function FriendsTab() {
	return (
		<>
			<AddFriendsPressableText />
			<IncomingFriendRequestsListContainer />
			<FriendActivity />
		</>
	);
}
