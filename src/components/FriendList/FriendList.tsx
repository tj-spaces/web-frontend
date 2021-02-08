import {PublicUserInfo} from '../../typings/PublicUserInfo';
import BaseRow from '../base/BaseRow';
import FriendListRow from './FriendListRow';

export default function FriendList({friends}: {friends: PublicUserInfo[]}) {
	return (
		<BaseRow direction="column" alignment="center" spacing={1} edges={1}>
			{friends.map((friend) => (
				<FriendListRow friend={friend} key={friend.id} />
			))}
		</BaseRow>
	);
}
