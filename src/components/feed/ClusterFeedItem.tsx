/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {Link} from 'react-router-dom';
import {joinCluster} from '../../api/clusters';
import {Cluster} from '../../typings/Cluster';
import BaseButton from '../base/BaseButton';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';

export default function ClusterPreview({
	cluster,
	joined = false,
}: {
	cluster: Cluster;
	joined?: boolean;
}) {
	const joinThisCluster = () => {
		joinCluster(cluster.id).then(() => {
			window.location.href = '/clusters/' + cluster.id;
		});
	};

	return (
		<BaseRow
			direction="column"
			borderRadius={1}
			backgroundColor="bgElevated"
			rails={2}
			spacing={1}
			edges={2}
			boxShadow
			width="30rem"
		>
			<BaseText variant="list-item-title">
				<Link to={'/clusters/' + cluster.id}>{cluster.name}</Link>
			</BaseText>
			<BaseText>
				Last active <b>now</b>
			</BaseText>
			{!joined ? (
				<BaseButton
					size="small"
					variant="theme"
					onClick={() => joinThisCluster()}
				>
					Join
				</BaseButton>
			) : (
				<BaseButton size="small" variant="theme" to={'/clusters/' + cluster.id}>
					Enter
				</BaseButton>
			)}
		</BaseRow>
	);
}
