/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/

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
