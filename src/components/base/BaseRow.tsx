/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {borderRadiusStyles} from '../../styles/borderRadius';
import boxShadowStyles from '../../styles/boxShadow';
import {backgroundColors as backgroundColorStyles} from '../../styles/colors';
import {
	ClassProvider,
	createStylesheet,
	stylex,
} from '../../styles/createStylesheet';
import {columnEdgeStyles, rowEdgeStyles} from '../../styles/edges';
import {
	alignmentStyles,
	flexStyles,
	justifyContentStyles,
} from '../../styles/flex';
import positionStyles from '../../styles/position';
import {colRails, rowRails} from '../../styles/rails';
import {
	spaceBetweenFlexColumnItems,
	spaceBetweenFlexRowItems,
} from '../../styles/spaceBetweenFlexItems';

export default function BaseRow({
	alignment = 'start',
	backgroundColor = 'default',
	borderRadius = 0,
	boxShadow = false,
	centerSelf = false,
	direction = 'row',
	edges = 0,
	flex,
	height,
	justifyContent = 'start',
	overflow = 'visible',
	position = 'static',
	rails = 0,
	spacing = 0,
	width,
	xstyle,
	children,
}: {
	alignment?: keyof typeof alignmentStyles;
	backgroundColor?: keyof typeof backgroundColorStyles;
	borderRadius?: keyof typeof borderRadiusStyles;
	boxShadow?: boolean;
	centerSelf?: boolean;
	direction?: 'row' | 'column';
	edges?: keyof typeof rowEdgeStyles;
	flex?: number;
	height?: string;
	justifyContent?: keyof typeof justifyContentStyles;
	overflow?: keyof typeof overflowStyles;
	position?: keyof typeof positionStyles;
	rails?: keyof typeof rowRails;
	spacing?: keyof typeof spaceBetweenFlexRowItems;
	width?: string;
	xstyle?: ClassProvider;
	children: React.ReactNode;
}) {
	const baseStyle = direction === 'row' ? flexStyles.row : flexStyles.column;
	const boxShadowStyle = boxShadow && boxShadowStyles.boxShadow;
	const spacingStyle = (direction === 'row'
		? spaceBetweenFlexRowItems
		: spaceBetweenFlexColumnItems)[spacing];
	const railsStyle = (direction === 'row' ? rowRails : colRails)[rails];
	const edgesStyle = (direction === 'row' ? rowEdgeStyles : columnEdgeStyles)[
		edges
	];
	const alignmentStyle = alignmentStyles[alignment];
	const justifyContentStyle = justifyContentStyles[justifyContent];
	const overflowStyle = overflowStyles[overflow];
	const borderRadiusStyle = borderRadiusStyles[borderRadius];
	const backgroundColorStyle = backgroundColorStyles[backgroundColor];
	const centerStyle = centerSelf && centerSelfs[direction];
	const positionStyle = positionStyles[position];
	return (
		<div
			className={stylex(
				alignmentStyle,
				backgroundColorStyle,
				baseStyle,
				borderRadiusStyle,
				centerStyle,
				edgesStyle,
				justifyContentStyle,
				overflowStyle,
				railsStyle,
				positionStyle,
				spacingStyle,
				boxShadowStyle,
				xstyle
			)}
			style={{width, height, flex}}
		>
			{children}
		</div>
	);
}

export const centerSelfs = createStylesheet({
	row: {
		marginTop: 'auto',
		marginBottom: 'auto',
	},
	column: {
		marginLeft: 'auto',
		marginRight: 'auto',
	},
});

export const overflowStyles = createStylesheet({
	auto: {overflow: 'auto'},
	scroll: {overflow: 'scroll'},
	hidden: {overflow: 'hidden'},
	visible: {overflow: 'visible'},
});
