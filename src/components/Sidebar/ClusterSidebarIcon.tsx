import React from 'react';
import SidebarIcon from './SidebarIcon';
import { Link } from 'react-router-dom';
import BaseText from '../Base/BaseText';

export default function ClusterSidebarIcon({ photoUrl, title, to }: { photoUrl?: string; title: string; to: string }) {
	const titleInitials = title
		.split(' ')
		.filter(Boolean)
		.map((word) => word.slice(0, 1).toUpperCase());

	return (
		<SidebarIcon>
			<Link to={to}>
				{photoUrl ? <img src={photoUrl} alt={title} /> : <BaseText fontSize="large">{titleInitials}</BaseText>}
			</Link>
		</SidebarIcon>
	);
}
