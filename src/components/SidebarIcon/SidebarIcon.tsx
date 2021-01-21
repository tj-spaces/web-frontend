import { Link } from 'react-router-dom';
import Typography from '../Typography/Typography';

/**
 * Sidebar icon: a circular icon displayed on the sidebar with either a photo or the first letter of the title.
 * The width is 2.5rem.
 *
 */
export default function SidebarIcon({ photoUrl, title, to }: { photoUrl?: string; title: string; to: string }) {
	const titleInitials = title
		.split(' ')
		.filter(Boolean)
		.map((word) => word.slice(0, 1).toUpperCase());

	return (
		<div className="sidebar-icon">
			<Link to={to}>
				{photoUrl ? <img src={photoUrl} alt={title} /> : <Typography type="h1">{titleInitials}</Typography>}
			</Link>
		</div>
	);
}
