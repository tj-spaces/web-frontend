import {useState, useEffect} from 'react';
import {getFriendsList} from '../../api/api';
import {PublicUserInfo} from '../../typings/PublicUserInfo';
import FriendList from './FriendList';

/**
 * Controller that fetches data about the user's friends and renders them in a <FriendList/>
 */
export default function FriendListContainer() {
	let [friendsPagingAfter, setFriendPagingAfter] = useState<string>('0');
	let [friends, setFriends] = useState<PublicUserInfo[]>([]);

	useEffect(() => {
		if (friendsPagingAfter != null) {
			getFriendsList(friendsPagingAfter).then(({data, paging}) => {
				setFriends((friends) => friends.concat(data));
				setFriendPagingAfter(paging.after);
			});
		}
	}, [friendsPagingAfter]);

	return <FriendList friends={friends} />;
}
