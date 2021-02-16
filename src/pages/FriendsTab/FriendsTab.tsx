import React from 'react';
import AddFriendsPressableText from '../../components/addFriends/AddFriendsPressableText';
import BaseText from '../../components/base/BaseText';
import FriendActivity from '../../components/friendActivity/FriendActivity';
import IncomingFriendRequestsListContainer from '../../components/incomingFriendRequests/IncomingFriendRequestsListContainer';

/**
 * Renders a tab where you can see which friends are online
 */
export default function FriendsTab() {
	return (
		<>
			<BaseText variant="primary-title">Friends</BaseText>
			<AddFriendsPressableText />
			<IncomingFriendRequestsListContainer />
			<FriendActivity />
		</>
	);
}
