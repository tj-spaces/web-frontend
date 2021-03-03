import React from 'react';
import BaseRow from './base/BaseRow';
import BaseText from './base/BaseText';
import FriendActivity from './friendActivity/FriendActivity';

/**
 * The baseline sidebar seen when you're online. Displays a list of currently online friends, as well as a list
 * of currently active clusters.
 */
export default function Sidebar() {
	return (
		<BaseRow direction="column" rails={1} edges={1}>
			<BaseText variant="list-item-title">Online</BaseText>
			<FriendActivity />
			<BaseText variant="list-item-title">Active Groups</BaseText>
		</BaseRow>
	);
}
