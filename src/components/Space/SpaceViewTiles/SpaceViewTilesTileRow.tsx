import { createStylesheet } from '../../../styles/createStylesheet';

const gap = '1rem';

export const styles = createStylesheet({
	participantRow: {
		display: 'flex',
		flexDirection: 'row',
		padding: gap,
		justifyContent: 'center',
		subSelectors: {
			'*': {
				marginLeft: gap,
				marginRight: gap,
				borderRadius: '4rem'
			}
		}
	}
});

export default function SpaceViewTilesTileRow({ participants }: { participants: React.ReactNode }) {
	return <div className={styles('participantRow')}>{participants}</div>;
}
