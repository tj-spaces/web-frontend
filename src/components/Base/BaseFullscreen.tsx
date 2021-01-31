import { createStylesheet } from '../../styles/createStylesheet';

export const styles = createStylesheet({
	fullscreen: {
		minWidth: '100vw',
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default function Fullscreen({ children }: { children?: React.ReactNode }) {
	return <div className={styles.fullscreen}>{children}</div>;
}
