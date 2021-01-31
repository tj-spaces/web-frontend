import { createStylesheet } from '../styles/createStylesheet';

const styles = createStylesheet({
	centeredLoadingText: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%'
	}
});

export default function CenteredLoadingText() {
	return (
		<div className={styles.centeredLoadingText}>
			<h1>Loading...</h1>
		</div>
	);
}
