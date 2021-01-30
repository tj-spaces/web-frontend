import { classes, createStylesheet } from '../../styles/createStylesheet';

export const styles = createStylesheet({
	fullscreen: {
		minWidth: '100vw',
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column'
	},
	centerVertical: {
		justifyContent: 'center'
	},
	centerHorizontal: {
		alignItems: 'center'
	}
});

export default function Fullscreen({
	children,
	centerVertical = true,
	centerHorizontal = true
}: {
	children?: React.ReactNode;
	centerVertical?: boolean;
	centerHorizontal?: boolean;
}) {
	return (
		<div
			className={classes(
				styles.fullscreen,
				centerVertical && styles.centerVertical,
				centerHorizontal && styles.centerHorizontal
			)}
		>
			{children}
		</div>
	);
}
