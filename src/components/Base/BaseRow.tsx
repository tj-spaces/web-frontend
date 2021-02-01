import { CSSProperties } from 'react';
import { classes, createStylesheet, Stylesheet } from '../../styles/createStylesheet';

export const styles = createStylesheet({
	baseRow: {
		display: 'flex',
		flexDirection: 'row'
	},
	baseCol: {
		display: 'flex',
		flexDirection: 'column'
	}
});

export default function BaseRow({
	direction = 'row',
	spacing = 0,
	rails = 0,
	alignment = 'left',
	justifyContent = 'start',
	overflow = 'visible',
	borderRadius = 0,
	children,
	width,
	height,
	style,
	backgroundColor = 'default',
	centerSelf = false
}: {
	alignment?: keyof typeof alignments;
	backgroundColor?: keyof typeof backgroundColors;
	borderRadius?: keyof typeof borderRadii;
	centerSelf?: boolean;
	direction?: 'row' | 'column';
	height?: string;
	justifyContent?: keyof typeof justifyContents;
	overflow?: keyof typeof overflows;
	rails?: keyof typeof rowRails;
	spacing?: keyof typeof rowSpacings;
	width?: string;
	style?: CSSProperties;
	children: React.ReactNode;
}) {
	const baseStyle = direction === 'row' ? styles.baseRow : styles.baseCol;
	const spacingStyle = (direction === 'row' ? rowSpacings : colSpacings)[spacing];
	const railsStyle = (direction === 'row' ? rowRails : colRails)[rails];
	const alignmentStyle = alignments[alignment];
	const justifyContentStyle = justifyContents[justifyContent];
	const overflowStyle = overflows[overflow];
	const borderRadiusStyle = borderRadii[borderRadius];
	const backgroundColorStyle = backgroundColors[backgroundColor];
	const centerStyle = centerSelf && centerSelfs[direction];
	return (
		<div
			className={classes(
				alignmentStyle,
				backgroundColorStyle,
				baseStyle,
				borderRadiusStyle,
				centerStyle,
				justifyContentStyle,
				overflowStyle,
				railsStyle,
				spacingStyle
			)}
			style={{ width, height, ...style }}
		>
			{children}
		</div>
	);
}

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
	left: { alignItems: 'left' },
	right: { alignItems: 'right' }
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
	2: { paddingTop: '1em', paddingBottom: '1em' },
	auto: { paddingTop: 'auto', paddingBottom: 'auto' }
});

export const colRails = createStylesheet({
	0: { paddingLeft: '0em', paddingRight: '0em' },
	1: { paddingLeft: '0.5em', paddingRight: '0.5em' },
	2: { paddingLeft: '1em', paddingRight: '1em' },
	auto: { paddingLeft: 'auto', paddingRight: 'auto' }
});

export const rowSpacing = (amt: string): Stylesheet[''] => ({
	paddingLeft: amt,
	paddingRight: amt,
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

export const colSpacing = (amt: string): Stylesheet[''] => ({
	paddingTop: amt,
	paddingBottom: amt,
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
	0: rowSpacing('0rem'),
	1: rowSpacing('0.5rem'),
	2: rowSpacing('1rem')
});

export const colSpacings = createStylesheet({
	0: colSpacing('0rem'),
	1: colSpacing('0.5rem'),
	2: colSpacing('1rem')
});
