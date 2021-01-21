import React from 'react';
import SidebarIcon from '../SidebarIcon/SidebarIcon';
import '../SidebarIcon/SidebarIcon';
import { Link } from 'react-router-dom';
import Typography from '../Typography/Typography';

export default function SpaceSidebarIcon({ photoUrl, title, to }: { photoUrl?: string; title: string; to: string }) {
	const titleInitials = title
		.split(' ')
		.filter(Boolean)
		.map((word) => word.slice(0, 1).toUpperCase());

	return (
		<SidebarIcon>
			<Link to={to}>
				{photoUrl ? <img src={photoUrl} alt={title} /> : <Typography type="h1">{titleInitials}</Typography>}
			</Link>
		</SidebarIcon>
	);
}
