import {createStylesheet, stylex} from '../../styles/createStylesheet';
import {textAlignStyles} from '../../styles/textAlign';
import {textStyles} from '../../styles/textStyles';

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
	return (
		<span
			className={stylex(
				textAlignStyles[alignment],
				variant ? textStyles[variant] : undefined,
				underline ? textDecorationStyles.underline : undefined
			)}
			onClick={onClick}
			style={onClick ? {cursor: 'pointer'} : undefined}
		>
			{children}
		</span>
	);
}
