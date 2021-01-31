import { createStylesheet } from '../../styles/createStylesheet';

export const styles = createStylesheet({
	fullscreen: {
		minWidth: '100vw',
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column'
	}
});

export default function Fullscreen({ children }: { children?: React.ReactNode }) {
	return <div className={styles.fullscreen}>{children}</div>;
}
