import AddFriendsPressableText from '../addFriends/AddFriendsPressableText';
import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';
import FriendListContainer from '../friendList/FriendListContainer';

/**
 * Renders a section that displays the header "Friends", any incoming friend requests, and the user's
 * list of friends.
 */
export default function FriendsSection() {
	return (
		<BaseRow direction="row" alignment="center" spacing={1}>
			<BaseText fontSize="xl" fontWeight="bold">
				Friends
			</BaseText>
			<AddFriendsPressableText />
			<FriendListContainer />
		</BaseRow>
	);
}
