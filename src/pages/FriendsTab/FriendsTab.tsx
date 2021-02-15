import React from 'react';
import BaseText from '../../components/base/BaseText';
import FriendListContainer from '../../components/friendList/FriendListContainer';

export default function FriendsTab() {
	return (
		<>
			<BaseText variant="primary-title" alignment="center">
				Friends
			</BaseText>
			<FriendListContainer />
		</>
	);
}
