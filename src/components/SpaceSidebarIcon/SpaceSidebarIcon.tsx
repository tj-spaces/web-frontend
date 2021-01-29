import React from 'react';
import SidebarIcon from '../SidebarIcon/SidebarIcon';
import { Link } from 'react-router-dom';
import Typography from '../BaseText/BaseText';

export default function SpaceSidebarIcon({ photoUrl, title, to }: { photoUrl?: string; title: string; to: string }) {
	const titleInitials = title
		.split(' ')
		.filter(Boolean)
		.map((word) => word.slice(0, 1).toUpperCase());

	return (
		<SidebarIcon>
			<Link to={to}>
				{photoUrl ? (
					<img src={photoUrl} alt={title} />
				) : (
					<Typography fontSize="large">{titleInitials}</Typography>
				)}
			</Link>
		</SidebarIcon>
	);
}
