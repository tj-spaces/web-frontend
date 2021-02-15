import React from 'react';
import BaseText from '../../components/base/BaseText';
import FriendActivity from '../../components/friendActivity/FriendActivity';

/**
 * Renders a tab where you can see which friends are online
 */
export default function FriendsTab() {
	return (
		<>
			<BaseText variant="primary-title">Friends</BaseText>
			<FriendActivity />
		</>
	);
}
