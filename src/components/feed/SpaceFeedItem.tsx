import React from 'react';
import {Link} from 'react-router-dom';
import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';
import {createStylesheet} from '../../styles/createStylesheet';
import {SpaceSession} from '../../typings/SpaceSession';

const styles = createStylesheet({
	spaceFeedItemIcon: {
		flex: 1,
		borderRadius: '100%',
		maxWidth: '4rem',
	},
	spaceFeedItemContent: {
		flex: 4,
		display: 'flex',
		flexDirection: 'column',
	},
});

/**
 * Renders a feed item for a Space. Includes the profile photo of the host of the space,
 * a display for how many people are online, and the name of the host of the space. When
 * you click on the name of the space (which is in larger font), you are taken to the space.
 */
export default function SpaceFeedItem({space}: {space: SpaceSession}) {
	return (
		<BaseRow
			direction="column"
			borderRadius={1}
			backgroundColor="bgElevated"
			rails={2}
			spacing={1}
			edges={1}
			boxShadow
		>
			<BaseText variant="list-item-title">
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
						Hosted by <BaseText variant="body-bold">{space.host.name}</BaseText>
					</BaseText>
				</div>
			</BaseRow>
		</BaseRow>
	);
}
