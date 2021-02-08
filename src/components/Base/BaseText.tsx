import {useContext} from 'react';
import {createStylesheet, stylex} from '../../styles/createStylesheet';
import {textAlignStyles} from '../../styles/textAlign';
import {textStyles} from '../../styles/textStyles';
import BackgroundColorContext from '../BackgroundColorContext';

const colorStylesDarkBackground = createStylesheet({
	normal: {
		color: 'var(--text-primary)',
	},
});

const colorStylesLightBackground = createStylesheet({
	normal: {
		color: 'var(--bg-primary)',
	},
});

const textDecorationStyles = createStylesheet({
	underline: {
		textDecoration: 'underline',
	},
});

export default function BaseText({
	alignment = 'start',
	variant,
	underline = false,
	children,
	onClick,
}: {
	alignment?: 'start' | 'end' | 'center';
	variant?: keyof typeof textStyles;
	underline?: boolean;
	children: React.ReactNode;
	onClick?: () => void;
}) {
	const BackgroundColor = useContext(BackgroundColorContext);

	const colorClass = (BackgroundColor === 'dark'
		? colorStylesDarkBackground
		: colorStylesLightBackground
	).normal;

	return (
		<span
			className={stylex(
				textAlignStyles[alignment],
				variant ? textStyles[variant] : undefined,
				underline ? textDecorationStyles.underline : undefined,
				colorClass
			)}
			onClick={onClick}
			style={onClick ? {cursor: 'pointer'} : undefined}
		>
			{children}
		</span>
	);
}
