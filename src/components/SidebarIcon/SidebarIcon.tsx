/**
 * Sidebar icon: a circular icon displayed on the sidebar with either a photo or the first letter of the title.
 * The width is 2.5rem.
 *
 */
export default function SidebarIcon({ children }: { children: React.ReactNode }) {
	return <div className="sidebar-icon column-item">{children}</div>;
}
