import { BorderRadiusBubble } from '../../styles/borderRadius';
import { classes, createStylesheet } from '../../styles/createStylesheet';
import { DivProps } from '../Space/PositionalDiv';

export const styles = createStylesheet({
	buttonRow: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		margin: '0.5em 0em'
	},
	paddedColumn: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '1em'
	},
	container: {
		display: 'flex',
		flexDirection: 'row',
		width: '100vw',
		height: '100vh'
	},
	card: {
		borderRadius: BorderRadiusBubble,
		backgroundColor: 'var(--spaces-color-dark-2)',
		padding: '2em'
	}
});

export default function Box({
	children,
	variant,
	className,
	...props
}: {
	children: React.ReactNode;
	variant: 'buttonRow' | 'paddedColumn' | 'container' | 'card';
	className?: string;
} & DivProps) {
	return (
		<div {...props} className={classes(styles[variant], className)}>
			{children}
		</div>
	);
}
