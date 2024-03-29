/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useState, useEffect} from 'react';
import {getFriendsList} from '../../api/friends';
import {PublicUserInfo} from '../../typings/PublicUserInfo';
import FriendList from './FriendList';

/**
 * Controller that fetches data about the user's friends and renders them in a <FriendList/>
 */
export default function FriendListContainer() {
	let [nextKey, setNextKey] = useState<string>('0');
	let [friends, setFriends] = useState<PublicUserInfo[]>([]);

	useEffect(() => {
		if (nextKey != null) {
			getFriendsList(nextKey).then(({data, paging}) => {
				setFriends((friends) => friends.concat(data));
				setNextKey(paging.after);
			});
		}
	}, [nextKey]);

	return <FriendList friends={friends} />;
}
