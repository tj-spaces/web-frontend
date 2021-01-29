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
	children
}: {
	direction?: 'row' | 'column';
	spacing?: 0 | 1;
	rails?: 0 | 1;
	alignment?: 'center' | 'left' | 'right';
	children: React.ReactNode;
}) {
	const baseStyle = direction === 'row' ? styles.baseRow : styles.baseCol;
	const spacingStyle = (direction === 'row' ? rowSpacings : colSpacings)[spacing];
	const railsStyle = (direction === 'row' ? rowRails : colRails)[rails];
	const alignmentStyle = alignments[alignment];
	return <div className={classes(baseStyle, spacingStyle, railsStyle, alignmentStyle)}>{children}</div>;
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

export const rowRails = createStylesheet({
	0: {},
	1: {
		marginTop: '0.5em',
		marginBottom: '0.5em'
	}
});

export const colRails = createStylesheet({
	0: {},
	1: {
		marginLeft: '0.5em',
		marginRight: '0.5em'
	}
});

export const rowSpacings = createStylesheet({
	0: {},
	1: {
		marginLeft: '0.5em',
		marginRight: '0.5em',
		pseudoSelectors: {
			'>*': {
				pseudoSelectors: {
					':not(:first-child)': {
						marginLeft: '0.5em'
					},
					':not(:last-child)': {
						marginRight: '0.5em'
					}
				}
			}
		}
	}
});

export const colSpacings = createStylesheet({
	0: {},
	1: {
		marginTop: '0.5em',
		marginBottom: '0.5em',
		pseudoSelectors: {
			'>*': {
				pseudoSelectors: {
					':not(:first-child)': {
						marginTop: '0.5em'
					},
					':not(:last-child)': {
						marginBottom: '0.5em'
					}
				}
			}
		}
	}
});
