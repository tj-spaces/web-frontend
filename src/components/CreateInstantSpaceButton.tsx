import boxShadow from '../styles/boxShadow';
import colors from '../styles/colors';
import { createStylesheet } from '../styles/createStylesheet';

const styles = createStylesheet({
	createInstantSpaceButton: {
		backgroundColor: colors.red,
		color: colors.white,
		padding: '0.5em',
		border: '0px',
		fontWeight: 'bold',
		borderRadius: '0.5em',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		textTransform: 'uppercase',
		cursor: 'pointer',
		extends: [boxShadow.boxShadow]
	}
});

export default function CreateInstantSpaceButton() {
	return (
		<button
			className={styles.createInstantSpaceButton}
			onClick={() => {
				alert('Creating a space');
			}}
		>
			Create Instant Space
		</button>
	);
}
