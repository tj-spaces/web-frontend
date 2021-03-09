/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {MouseEventHandler} from 'react';
import colors from '../../styles/colors';
import {
	stylex,
	ClassProvider,
	createStylesheet,
} from '../../styles/createStylesheet';

const baseButtonGroupItem = createStylesheet({
	base: {
		flex: 1,
		backgroundColor: '#404040',
		padding: '1rem',
		textAlign: 'center',
		cursor: 'pointer',
		subSelectors: {
			':first-child': {
				borderTopLeftRadius: '0.5em',
				borderBottomLeftRadius: '0.5em',
			},
			':last-child': {
				borderTopRightRadius: '0.5em',
				borderBottomRightRadius: '0.5em',
			},
		},
		transition: 'background-color 200ms ease',
	},
	selected: {
		backgroundColor: colors.red,
	},
});

export default function BaseButtonGroupItem({
	children,
	classes,
	onClick,
}: {
	children: React.ReactNode;
	classes?: ClassProvider | null | false;
	onClick: MouseEventHandler;
}) {
	return (
		<div
			className={stylex(baseButtonGroupItem.base, classes)}
			onClick={(event) => onClick(event)}
		>
			{children}
		</div>
	);
}
