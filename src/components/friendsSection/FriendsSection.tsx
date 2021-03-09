/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import AddFriendsPressableText from '../addFriends/AddFriendsPressableText';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import FriendListContainer from '../friendList/FriendListContainer';

/**
 * Renders a section that displays the header "Friends", any incoming friend requests, and the user's
 * list of friends.
 */
export default function FriendsSection() {
	return (
		<BaseRow direction="row" alignment="center" spacing={1}>
			<BaseText variant="secondary-title">Friends</BaseText>
			<AddFriendsPressableText />
			<FriendListContainer />
		</BaseRow>
	);
}
