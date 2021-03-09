/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {
	ClassProvider,
	createStylesheet,
	stylex,
} from '../../styles/createStylesheet';
import {textAlignStyles} from '../../styles/textAlign';
import {textStyles} from '../../styles/textStyles';

const textDecorationStyles = createStylesheet({
	underline: {
		textDecoration: 'underline',
	},
});

const selectableStyles = createStylesheet({
	unselectable: {
		userSelect: 'none',
	},
});

export default function BaseText({
	alignment = 'start',
	children,
	onClick,
	underline = false,
	unselectable = false,
	variant,
	xstyle,
}: {
	alignment?: 'start' | 'end' | 'center';
	children: React.ReactNode;
	onClick?: () => void;
	underline?: boolean;
	unselectable?: boolean;
	variant?: keyof typeof textStyles;
	xstyle?: ClassProvider;
}) {
	return (
		<span
			className={stylex(
				textAlignStyles[alignment],
				variant ? textStyles[variant] : undefined,
				underline ? textDecorationStyles.underline : undefined,
				unselectable ? selectableStyles.unselectable : undefined,
				xstyle
			)}
			onClick={onClick}
			style={onClick ? {cursor: 'pointer'} : undefined}
		>
			{children}
		</span>
	);
}
