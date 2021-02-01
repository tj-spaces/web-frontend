import { createStylesheet } from '../../styles/createStylesheet';

export const styles = createStylesheet({
	participantRow: {
		display: 'flex',
		flexDirection: 'row',
		padding: '2rem',
		justifyContent: 'center',
		subSelectors: {
			'*': {
				marginLeft: '2rem',
				marginRight: '2rem'
			}
		}
	}
});

export default function SpaceView2DParticipantRow({ participants }: { participants: React.ReactNode }) {
	return <div className={styles.participantRow}>{participants}</div>;
}
