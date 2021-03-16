/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useRef} from 'react';
import {Link} from 'react-router-dom';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import {createStylesheet} from '../../styles/createStylesheet';
import {Space} from '../../typings/Space';
import {Cluster} from '../../typings/Cluster';
import {PublicUserInfo} from '../../typings/PublicUserInfo';
import {getPublicUser} from '../../api/api';
import Awaiting from '../Awaiting';
import {getCluster} from '../../api/clusters';
import usePromiseStatus from '../../hooks/usePromiseStatus';
import BaseButton from '../base/BaseButton';

const styles = createStylesheet({
	spaceFeedItem: {
		minWidth: '30rem',
		// minHeight: '20rem',
	},
});

/**
 * Renders a feed item for a Space. Includes the profile photo of the host of the space,
 * a display for how many people are online, and the name of the host of the space. When
 * you click on the name of the space (which is in larger font), you are taken to the space.
 */
export default function SpaceFeedItem({space}: {space: Space}) {
	const promise = useRef(() =>
		space.creator_id
			? getPublicUser(space.creator_id)
			: getCluster(space.cluster_id!)
	);
	const {value: host, status: hostFs} = usePromiseStatus<
		PublicUserInfo | Cluster
	>(promise.current);

	return (
		<BaseRow
			direction="column"
			borderRadius={1}
			backgroundColor="bgElevated"
			rails={2}
			spacing={1}
			edges={2}
			boxShadow
			xstyle={styles.spaceFeedItem}
		>
			<BaseText variant="secondary-title">
				<Link to={'/spaces/' + space.id}>{space.name}</Link>
			</BaseText>
			<BaseRow direction="row" alignment="center" spacing={0.5}>
				<BaseButton variant="theme" to={'/spaces/' + space.id}>
					Join
				</BaseButton>
				<BaseText variant="list-item-title">Online:</BaseText>
				<BaseText variant="body-semibold">1.3k</BaseText>
			</BaseRow>
			<BaseText>
				Hosted by{' '}
				<Awaiting fetchStatus={hostFs}>
					<BaseText variant="body-bold">{host?.name}</BaseText>
				</Awaiting>
			</BaseText>
		</BaseRow>
	);
}
