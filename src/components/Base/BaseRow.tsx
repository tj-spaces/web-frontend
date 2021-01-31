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
	children,
	width,
	height,
	style
}: {
	direction?: 'row' | 'column';
	spacing?: 0 | 1 | 2;
	rails?: 0 | 1 | 2 | 'auto';
	alignment?: 'center' | 'left' | 'right';
	justifyContent?: 'center' | 'start' | 'end';
	overflow?: 'auto' | 'scroll' | 'hidden' | 'visible';
	children: React.ReactNode;
	width?: string;
	height?: string;
	style?: CSSProperties;
}) {
	const baseStyle = direction === 'row' ? styles.baseRow : styles.baseCol;
	const spacingStyle = (direction === 'row' ? rowSpacings : colSpacings)[spacing];
	const railsStyle = (direction === 'row' ? rowRails : colRails)[rails];
	const alignmentStyle = alignments[alignment];
	const justifyContentStyle = justifyContents[justifyContent];
	const overflowStyle = overflows[overflow];
	return (
		<div
			className={classes(baseStyle, spacingStyle, railsStyle, alignmentStyle, justifyContentStyle, overflowStyle)}
			style={{ width, height, ...style }}
		>
			{children}
		</div>
	);
}

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
	0: { marginTop: '0em', marginBottom: '0em' },
	1: { marginTop: '0.5em', marginBottom: '0.5em' },
	2: { marginTop: '1em', marginBottom: '1em' },
	auto: { marginTop: 'auto', marginBottom: 'auto' }
});

export const colRails = createStylesheet({
	0: { marginLeft: '0em', marginRight: '0em' },
	1: { marginLeft: '0.5em', marginRight: '0.5em' },
	2: { marginLeft: '1em', marginRight: '1em' },
	auto: { marginLeft: 'auto', marginRight: 'auto' }
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
