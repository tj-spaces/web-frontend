import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {createStylesheet} from '../../styles/createStylesheet';
import {Space} from '../../typings/Space';
import {Cluster} from '../../typings/Cluster';
import {PublicUserInfo} from '../../typings/PublicUserInfo';
import {FetchStatus} from '../../api/FetchStatus';
import {getPublicUser} from '../../api/api';
import Awaiting from '../Awaiting';
import {getCluster} from '../../api/clusters';

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
export default function SpaceFeedItem({space}: {space: Space}) {
	const [host, setHost] = useState<Cluster | PublicUserInfo>();
	const [hostFs, setHostFs] = useState<FetchStatus>(null);

	useEffect(() => {
		setHost(undefined);
		setHostFs('loading');
		(async () => {
			try {
				if (space.creator_id) {
					setHost(await getPublicUser(space.creator_id));
				} else if (space.cluster_id) {
					setHost(await getCluster(space.cluster_id));
				}
				setHostFs('loaded');
			} catch (e) {
				setHostFs('errored');
			}
		})();
	}, [space]);

	return (
		<BaseRow
			direction="column"
			borderRadius={1}
			backgroundColor="bgElevated"
			rails={2}
			spacing={1}
			edges={2}
			boxShadow
		>
			<BaseText variant="list-item-title">
				<Link to={'/spaces/' + space.id}>{space.name}</Link>
			</BaseText>
			<BaseRow direction="row" width="100%" spacing={1}>
				{/* <img
					className={styles('spaceFeedItemIcon')}
					src={host?.picture ?? ""}
					alt={host?.name + ' is hosting this space'}
				/> */}
				<div className={styles('spaceFeedItemContent')}>
					<BaseText>1.3k are online</BaseText>
					<BaseText>
						<Awaiting fetchStatus={hostFs}>
							Hosted by <BaseText variant="body-bold">{host?.name}</BaseText>
						</Awaiting>
					</BaseText>
				</div>
			</BaseRow>
		</BaseRow>
	);
}
