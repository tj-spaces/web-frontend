import { useEffect, useState } from 'react';
import { getFriendsList } from '../../api/api';
import { Friend } from '../../typings/Friend';
import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';
import FriendListRow from './FriendListRow';

export default function FriendList() {
	let [after, setAfter] = useState<string>('0');
	let [friends, setFriends] = useState<Friend[]>([]);
	useEffect(() => {
		if (after != null) {
			getFriendsList(after).then(({ data, paging }) => {
				setFriends((friends) => friends.concat(data));
				setAfter(paging.after);
			});
		}
	}, [after]);

	return (
		<BaseRow direction="column" alignment="center">
			<BaseText variant="heading" fontSize="xl" fontWeight="bold">
				Friends
			</BaseText>
			{friends.map((friend) => (
				<FriendListRow friend={friend} key={friend.id} />
			))}
		</BaseRow>
	);
}
