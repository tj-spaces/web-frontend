import {PublicUserInfo} from '../../typings/PublicUserInfo';
import BaseRow from '../base/BaseRow';
import FriendActivityRow from './FriendActivityRow';

/**
 * Renders a list of friends
 */
export default function FriendActivityList({
	friends,
}: {
	friends: PublicUserInfo[];
}) {
	return (
		<BaseRow direction="column" alignment="center" spacing={1} edges={1}>
			{friends.map((friend) => (
				<FriendActivityRow friend={friend} key={friend.id} />
			))}
		</BaseRow>
	);
}
