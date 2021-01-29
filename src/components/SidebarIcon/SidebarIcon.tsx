import { createStylesheet } from '../../styles/createStylesheet';
import spacing from '../../styles/spacing';

export const styles = createStylesheet({
	sidebarIcon: {
		extends: [spacing.columnItem],
		borderRadius: '1rem',
		width: '4rem',
		height: '4rem',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'var(--spaces-color-dark-1)',
		textDecoration: 'none',
		color: 'var(--spaces-color-light-0)',
		transition: 'background-color 0.5s ease',
		pseudoSelectors: {
			' a, button, span, h1': {
				cursor: 'pointer'
			},
			' a': {
				textDecoration: 'none',
				color: 'var(--spaces-color-light-0)'
			},
			':hover': {
				backgroundColor: 'var(--spaces-color-dark-3)'
			}
		}
	}
});

/**
 * Sidebar icon: a circular icon displayed on the sidebar with either a photo or the first letter of the title.
 * The width is 2.5rem.
 */
export default function SidebarIcon({ children }: { children: React.ReactNode }) {
	return <div className={styles.sidebarIcon}>{children}</div>;
}
