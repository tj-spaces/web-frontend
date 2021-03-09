/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
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
