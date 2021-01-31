import { classes, createStylesheet } from '../../styles/createStylesheet';

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
	children
}: {
	direction?: 'row' | 'column';
	spacing?: 0 | 1 | 2;
	rails?: 0 | 1 | 2;
	alignment?: 'center' | 'left' | 'right';
	justifyContent?: 'center' | 'start' | 'end';
	children: React.ReactNode;
}) {
	const baseStyle = direction === 'row' ? styles.baseRow : styles.baseCol;
	const spacingStyle = (direction === 'row' ? rowSpacings : colSpacings)[spacing];
	const railsStyle = (direction === 'row' ? rowRails : colRails)[rails];
	const alignmentStyle = alignments[alignment];
	const justifyContentStyle = justifyContents[justifyContent];
	return (
		<div className={classes(baseStyle, spacingStyle, railsStyle, alignmentStyle, justifyContentStyle)}>
			{children}
		</div>
	);
}

export const alignments = createStylesheet({
	center: {
		alignItems: 'center'
	},
	left: {
		alignItems: 'left'
	},
	right: {
		alignItems: 'right'
	}
});

export const justifyContents = createStylesheet({
	center: {
		justifyContent: 'center'
	},
	start: {
		justifyContent: 'start'
	},
	end: {
		justifyContent: 'center'
	},
	spaceBetween: {
		justifyContent: 'space-between'
	}
});

export const rowRails = createStylesheet({
	0: {},
	1: {
		marginTop: '0.5em',
		marginBottom: '0.5em'
	},
	2: {
		marginTop: '1em',
		marginBottom: '1em'
	}
});

export const colRails = createStylesheet({
	0: {},
	1: {
		marginLeft: '0.5em',
		marginRight: '0.5em'
	},
	2: {
		marginLeft: '1em',
		marginRight: '1em'
	}
});

export const rowSpacing = (amt: string) => ({
	marginLeft: amt,
	marginRight: amt,
	pseudoSelectors: {
		'>*': {
			pseudoSelectors: {
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

export const colSpacing = (amt: string) => ({
	marginTop: amt,
	marginBottom: amt,
	pseudoSelectors: {
		'>*': {
			pseudoSelectors: {
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
