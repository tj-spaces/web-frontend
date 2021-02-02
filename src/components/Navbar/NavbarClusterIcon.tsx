import React from 'react';
import NavbarIcon from './NavbarIcon';
import { Link } from 'react-router-dom';
import BaseText from '../Base/BaseText';

export default function NavbarClusterIcon({ photoUrl, title, to }: { photoUrl?: string; title: string; to: string }) {
	const titleInitials = title
		.split(' ')
		.filter(Boolean)
		.map((word) => word.slice(0, 1).toUpperCase());

	return (
		<NavbarIcon>
			<Link to={to}>
				{photoUrl ? <img src={photoUrl} alt={title} /> : <BaseText fontSize="large">{titleInitials}</BaseText>}
			</Link>
		</NavbarIcon>
	);
}
