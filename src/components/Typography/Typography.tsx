import classnames from 'classnames';

export type TypographyType = 'title' | 'h1' | 'h2' | 'paragraph' | 'compact';
export type TypographyColor = 'light' | 'dark';
export type TypographyAlignment = 'center' | 'left' | 'right';
export type TypographyDisplay = 'inline' | 'block';

export default function Typography({
	type,
	color = 'light',
	alignment = 'left',
	// display = 'inline',
	children,
	onClick
}: {
	type: TypographyType;
	color?: TypographyColor;
	alignment?: TypographyAlignment;
	// display?: TypographyDisplay;
	children: React.ReactNode;
	onClick?: () => void;
}) {
	const colorClasses = {
		light: 'color-light',
		dark: 'color-dark'
	};

	const typeClasses = {
		title: 'typography-title',
		h1: 'typography-h1',
		h2: 'typography-h2',
		paragraph: 'typography-paragraph',
		compact: 'typography-compact'
	};

	const alignmentClasses = {
		left: 'text-left',
		right: 'text-right',
		center: 'text-center'
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const displayClasses = {
		inline: 'typography-display-inline',
		block: 'typography-display-block'
	};

	return (
		<span
			className={classnames(
				typeClasses[type],
				colorClasses[color],
				alignmentClasses[alignment]
				// displayClasses[display]
			)}
			onClick={onClick}
		>
			{children}
		</span>
	);
}
