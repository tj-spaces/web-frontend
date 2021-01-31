import { classes, createStylesheet } from '../../styles/createStylesheet';

type DivProps = JSX.IntrinsicElements['div'];

const variantStyles = createStylesheet({
	baseScroller: {
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
		width: '100%',
		height: '100%',
		overflowY: 'auto'
	},
	baseScrollerHorizontal: {
		flexDirection: 'row'
	},
	default: {
		display: 'flex',
		flexDirection: 'column',
		overflowX: 'hidden',
		overflowY: 'hidden',
		position: 'relative',
		zIndex: 0
	},
	hideScrollbar: {
		scrollbarWidth: 'none',
		pseudoSelectors: {
			'::-webkit-scrollbar': {
				display: 'none'
			}
		}
	}
});

const railPaddingStyles = createStylesheet({
	none: {},
	railPadding: {
		paddingLeft: '1rem',
		paddingRight: '1rem'
	}
});

export default function ScrollableArea({
	hideScrollbar = false,
	railPadding = 'none',
	...props
}: {
	hideScrollbar?: boolean;
	railPadding?: 'none' | 'railPadding';
} & DivProps) {
	return (
		<div
			{...props}
			className={classes(
				variantStyles.baseScroller,
				hideScrollbar && variantStyles.hideScrollbar,
				railPaddingStyles[railPadding]
			)}
		/>
	);
}
