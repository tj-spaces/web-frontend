import colors from '../styles/colors';
import {createStylesheet} from '../styles/createStylesheet';

const styles = createStylesheet({
	sidebarItem: {
		width: '100%',
		padding: '0.5rem',
		borderRadius: '0.5em',
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
