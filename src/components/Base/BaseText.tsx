import { useContext } from 'react';
import { createStylesheet, stylex } from '../../styles/createStylesheet';
import { fontSizeStyles, fontWeightStyles } from '../../styles/font';
import { textAlignStyles } from '../../styles/textAlign';
import BackgroundColorContext from '../BackgroundColorContext';

const variantStyles = createStylesheet({
	base: {},
	heading: {
		marginBlockStart: '0.5em',
		marginBlockEnd: '0.5em',
		display: 'block'
	},
	caption: {
		textTransform: 'uppercase'
	}
});

const colorStylesDarkBackground = createStylesheet({
	normal: {
		color: 'var(--spaces-color-light-0)'
	}
});

const colorStylesLightBackground = createStylesheet({
	normal: {
		color: 'var(--spaces-color-dark-0)'
	}
});

const textDecorationStyles = createStylesheet({
	underline: {
		textDecoration: 'underline'
	}
});

export default function BaseText({
	fontWeight = 'normal',
	fontSize = 'medium',
	alignment = 'start',
	variant = 'base',
	underline = false,
	children,
	onClick
}: {
	alignment?: 'start' | 'end' | 'center';
	fontSize?: keyof typeof fontSizeStyles;
	fontWeight?: keyof typeof fontWeightStyles;
	variant?: keyof typeof variantStyles;
	underline?: boolean;
	children: React.ReactNode;
	onClick?: () => void;
}) {
	const BackgroundColor = useContext(BackgroundColorContext);

	const colorClass = (BackgroundColor === 'dark' ? colorStylesDarkBackground : colorStylesLightBackground).normal;

	return (
		<span
			className={stylex(
				fontWeightStyles[fontWeight],
				fontSizeStyles[fontSize],
				textAlignStyles[alignment],
				variantStyles[variant],
				underline ? textDecorationStyles.underline : undefined,
				colorClass
			)}
			onClick={onClick}
			style={onClick ? { cursor: 'pointer' } : undefined}
		>
			{children}
		</span>
	);
}
