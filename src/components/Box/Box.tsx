import classnames from 'classnames';
import { CSSProperties } from 'react';

const classes = {
	borderRadius: {
		none: 'border-radius-none',
		crisp: 'border-radius-crisp',
		bubble: 'border-radius-bubble'
	},
	margin: {
		none: 'margin-none',
		compact: 'margin-compact',
		comfortable: 'margin-comfortable',
		xAuto: 'margin-x-auto',
		yAuto: 'margin-y-auto'
	},
	padding: {
		none: 'padding-none',
		compact: 'padding-compact',
		comfortable: 'padding-comfortable'
	},
	justifyContent: {
		spaceAround: 'justify-content-space-around',
		spaceBetween: 'justify-content-space-between',
		spaceEvenly: 'justify-content-space-evenly'
	},
	display: {
		block: 'display-block',
		flexColumn: 'display-flex-column',
		flexRow: 'display-flex-row'
	}
};

export type BoxBorderRadiusSize = 'none' | 'crisp' | 'bubble';
export type BoxMargin = 'none' | 'compact' | 'comfortable' | 'x-auto' | 'y-auto';
export type BoxPadding = 'none' | 'compact' | 'comfortable';
export type BoxDisplay = 'block' | 'flex-column' | 'flex-row';
export type BoxAlignItems = 'center';
export type BoxJustifyContent = 'space-around' | 'space-evenly' | 'space-between';

export default function Box({
	children,
	backgroundColor,
	borderRadiusSize = 'none',
	margin = 'none',
	padding = 'none',
	center = false,
	display = 'block',
	alignItems,
	justifyContent,
	flex,
	width,
	height,
	className,
	style
}: {
	children: React.ReactNode;
	backgroundColor?: string;
	borderRadiusSize?: BoxBorderRadiusSize;
	margin?: BoxMargin;
	padding?: BoxPadding;
	center?: boolean;
	display?: BoxDisplay;
	width?: string;
	height?: string;
	className?: string;
	alignItems?: BoxAlignItems;
	justifyContent?: BoxJustifyContent;
	flex?: number;
	style?: CSSProperties;
}) {
	return (
		<div
			className={classnames(
				'border-radius-' + borderRadiusSize,
				'margin-' + margin,
				'padding-' + padding,
				center ? 'text-center' : '',
				'display-' + display,
				alignItems ? 'align-items-' + alignItems : '',
				justifyContent ? 'justify-content-' + alignItems : '',
				className
			)}
			style={{ backgroundColor, width, height, flex, ...style }}
		>
			{children}
		</div>
	);
}
