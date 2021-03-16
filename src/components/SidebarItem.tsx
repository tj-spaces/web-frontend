/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
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
	selected: {
		backgroundColor: colors.bgPrimary,
		subSelectors: {
			':hover': {
				backgroundColor: colors.bgPrimary,
			},
		},
	},
});

export default function SidebarItem({
	children,
	selected,
	onClick = () => {},
}: {
	children: React.ReactNode;
	selected: boolean;
	onClick?: () => void;
}) {
	return (
		<div
			className={styles('sidebarItem', selected && 'selected')}
			onClick={onClick}
		>
			{children}
		</div>
	);
}
