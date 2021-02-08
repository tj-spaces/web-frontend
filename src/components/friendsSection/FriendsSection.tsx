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
