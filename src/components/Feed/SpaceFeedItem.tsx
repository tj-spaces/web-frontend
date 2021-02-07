import React from 'react';
import { Link } from 'react-router-dom';
import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';
import { createStylesheet } from '../../styles/createStylesheet';
import { SpaceSession } from '../../typings/SpaceSession';

const styles = createStylesheet({
	spaceFeedItemIcon: {
		flex: 1,
		borderRadius: '100%',
		maxWidth: '4rem'
	},
	spaceFeedItemContent: {
		flex: 4,
		display: 'flex',
		flexDirection: 'column'
	}
});

export default function SpaceFeedItem({ space }: { space: SpaceSession }) {
	return (
		<BaseRow direction="column" borderRadius={1} backgroundColor="dark2" rails={2} spacing={1} edges={1} boxShadow>
			<BaseText fontSize="large" fontWeight="bold">
				<Link to={'/spaces/' + space.id}>{space.topic}</Link>
			</BaseText>
			<BaseRow direction="row" width="100%" spacing={1}>
				<img
					className={styles('spaceFeedItemIcon')}
					src={space.host.picture}
					alt={space.host.name + ' is hosting this space'}
				/>
				<div className={styles('spaceFeedItemContent')}>
					<BaseText>{space.online_count ?? 0} are online</BaseText>
					<BaseText>
						Hosted by <BaseText fontWeight="bold">{space.host.name}</BaseText>
					</BaseText>
				</div>
			</BaseRow>
		</BaseRow>
	);
}
