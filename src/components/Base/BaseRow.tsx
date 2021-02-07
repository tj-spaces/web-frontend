import boxShadowStyles from '../../styles/boxShadow';
import { stylex, createStylesheet, StylesheetDefinition, ClassProvider } from '../../styles/createStylesheet';

export default function BaseRow({
	alignment = 'start',
	backgroundColor = 'default',
	borderRadius = 0,
	boxShadow = false,
	centerSelf = false,
	direction = 'row',
	edges = 0,
	height,
	justifyContent = 'start',
	overflow = 'visible',
	rails = 0,
	spacing = 0,
	width,
	xstyle,
	children
}: {
	alignment?: keyof typeof alignments;
	backgroundColor?: keyof typeof backgroundColors;
	borderRadius?: keyof typeof borderRadii;
	boxShadow?: boolean;
	centerSelf?: boolean;
	direction?: 'row' | 'column';
	edges?: keyof typeof rowEdges;
	height?: string;
	justifyContent?: keyof typeof justifyContents;
	overflow?: keyof typeof overflows;
	rails?: keyof typeof rowRails;
	spacing?: keyof typeof rowSpacings;
	width?: string;
	xstyle?: ClassProvider;
	children: React.ReactNode;
}) {
	const baseStyle = direction === 'row' ? baseStyles.baseRow : baseStyles.baseCol;
	const boxShadowStyle = boxShadow && boxShadowStyles.boxShadow;
	const spacingStyle = (direction === 'row' ? rowSpacings : colSpacings)[spacing];
	const railsStyle = (direction === 'row' ? rowRails : colRails)[rails];
	const edgesStyle = (direction === 'row' ? rowEdges : colEdges)[edges];
	const alignmentStyle = alignments[alignment];
	const justifyContentStyle = justifyContents[justifyContent];
	const overflowStyle = overflows[overflow];
	const borderRadiusStyle = borderRadii[borderRadius];
	const backgroundColorStyle = backgroundColors[backgroundColor];
	const centerStyle = centerSelf && centerSelfs[direction];
	return (
		<div
			className={stylex(
				xstyle,
				alignmentStyle,
				backgroundColorStyle,
				baseStyle,
				borderRadiusStyle,
				centerStyle,
				edgesStyle,
				justifyContentStyle,
				overflowStyle,
				railsStyle,
				spacingStyle,
				boxShadowStyle
			)}
			style={{ width, height }}
		>
			{children}
		</div>
	);
}

export const baseStyles = createStylesheet({
	baseRow: {
		display: 'flex',
		flexDirection: 'row'
	},
	baseCol: {
		display: 'flex',
		flexDirection: 'column'
	}
});

export const backgroundColors = createStylesheet({
	default: {},
	light0: { backgroundColor: 'var(--spaces-color-light-0)' },
	light1: { backgroundColor: 'var(--spaces-color-light-1)' },
	light2: { backgroundColor: 'var(--spaces-color-light-2)' },
	dark0: { backgroundColor: 'var(--spaces-color-dark-0)' },
	dark1: { backgroundColor: 'var(--spaces-color-dark-1)' },
	dark2: { backgroundColor: 'var(--spaces-color-dark-2)' }
});

export const centerSelfs = createStylesheet({
	row: {
		marginTop: 'auto',
		marginBottom: 'auto'
	},
	column: {
		marginLeft: 'auto',
		marginRight: 'auto'
	}
});

export const rowEdges = createStylesheet({
	0: {},
	1: { paddingLeft: '0.5em', paddingRight: '0.5em' },
	2: { paddingLeft: '1em', paddingRight: '1em' }
});

export const colEdges = createStylesheet({
	0: {},
	1: { paddingTop: '0.5em', paddingBottom: '0.5em' },
	2: { paddingTop: '1em', paddingBottom: '1em' }
});

export const borderRadii = createStylesheet({
	0: {},
	1: { borderRadius: '1rem' },
	2: { borderRadius: '2rem' }
});

export const overflows = createStylesheet({
	auto: { overflow: 'auto' },
	scroll: { overflow: 'scroll' },
	hidden: { overflow: 'hidden' },
	visible: { overflow: 'visible' }
});

export const alignments = createStylesheet({
	center: { alignItems: 'center' },
	end: { alignItems: 'end' },
	start: { alignItems: 'start' }
});

export const justifyContents = createStylesheet({
	center: { justifyContent: 'center' },
	start: { justifyContent: 'start' },
	end: { justifyContent: 'center' },
	spaceBetween: { justifyContent: 'space-between' }
});

export const rowRails = createStylesheet({
	0: { paddingTop: '0em', paddingBottom: '0em' },
	1: { paddingTop: '0.5em', paddingBottom: '0.5em' },
	2: { paddingTop: '1em', paddingBottom: '1em' }
});

export const colRails = createStylesheet({
	0: { paddingLeft: '0em', paddingRight: '0em' },
	1: { paddingLeft: '0.5em', paddingRight: '0.5em' },
	2: { paddingLeft: '1em', paddingRight: '1em' }
});

export const rowSpacing = (amt: string): StylesheetDefinition[''] => ({
	subSelectors: {
		'>*': {
			subSelectors: {
				':not(:first-child)': {
					marginLeft: amt
				},
				':not(:last-child)': {
					marginRight: amt
				}
			}
		}
	}
});

export const colSpacing = (amt: string): StylesheetDefinition[''] => ({
	subSelectors: {
		'>*': {
			subSelectors: {
				':not(:first-child)': {
					marginTop: amt
				},
				':not(:last-child)': {
					marginBottom: amt
				}
			}
		}
	}
});

export const rowSpacings = createStylesheet({
	0: {},
	1: rowSpacing('0.5rem'),
	2: rowSpacing('1rem')
});

export const colSpacings = createStylesheet({
	0: {},
	1: colSpacing('0.5rem'),
	2: colSpacing('1rem')
});
