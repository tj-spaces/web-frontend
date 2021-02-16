import colors from '../styles/colors';
import {createStylesheet} from '../styles/createStylesheet';

const styles = createStylesheet({
	sidebarItem: {
		backgroundColor: colors.bgPrimary,
		transition: 'background-color 500ms ease;',
		width: '100%',
		padding: '0.5rem 1rem',
		cursor: 'pointer',
		subSelectors: {
			':hover': {
				backgroundColor: colors.bgElevated,
			},
		},
	},
});

export default function SidebarItem({
	children,
	onClick = () => {},
}: {
	children: React.ReactNode;
	onClick?: () => void;
}) {
	return (
		<div className={styles('sidebarItem')} onClick={onClick}>
			{children}
		</div>
	);
}
