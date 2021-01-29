import classnames from 'classnames';
import { createStylesheet } from '../../styles/createStylesheet';

export const styles = createStylesheet({
	buttonRow: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		margin: '0.5em 0em'
	},
	clusterBox: {
		display: 'flex',
		flexDirection: 'column',
		overflowY: 'auto',
		height: '100%',
		width: '100%'
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
	}
});

export default function Box({
	children,
	variant
}: {
	children: React.ReactNode;
	variant: 'buttonRow' | 'clusterBox' | 'paddedColumn' | 'container';
}) {
	return <div className={classnames(styles[variant])}>{children}</div>;
}
