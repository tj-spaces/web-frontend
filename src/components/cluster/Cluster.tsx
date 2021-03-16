/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useRef, useState} from 'react';
import {reportError} from '../../api/analytics';
import {getClusterMembers, useCluster} from '../../api/clusters';
import usePromiseStatus from '../../hooks/usePromiseStatus';
import {createStylesheet} from '../../styles/createStylesheet';
import Awaiting from '../Awaiting';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import UserListRow from '../UserListRow';
import ClusterSettingsModal from './ClusterSettingsModal';
import ClusterSidebar from './ClusterSidebar';
import CurrentClusterContext from './CurrentClusterContext';

const styles = createStylesheet({
	clusterContent: {
		flex: 4,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		paddingTop: '5rem',
	},
});

/**
 * Renders the main page for a cluster. This includes the list of Spaces and list of Posts in the cluster.
 * It also holds the button for displaying or hiding the settings.
 */
export default function Cluster({id}: {id: string}) {
	const clusterResponse = useCluster(id);
	const promise = useRef(() => getClusterMembers(id));
	const {status: membersFs, value: members} = usePromiseStatus(promise.current);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [isSidebarOpen] = useState(true);

	if (clusterResponse == null) {
		return null;
	}

	if ('error' in clusterResponse) {
		reportError(clusterResponse.error);
		return (
			<BaseText variant="primary-title" alignment="center">
				Error
			</BaseText>
		);
	}

	const cluster = clusterResponse.value;

	return (
		<CurrentClusterContext.Provider value={cluster}>
			{isSettingsOpen && (
				<ClusterSettingsModal onClose={() => setIsSettingsOpen(false)} />
			)}

			<BaseRow
				direction="row"
				rails={1}
				backgroundColor="bgSecondary"
				width="100%"
				height="100%"
			>
				<ClusterSidebar
					sections={[]}
					clusterName={cluster.name}
					isOpen={isSidebarOpen}
				/>
				<div className={styles('clusterContent')}>
					<BaseText variant="primary-title" alignment="center">
						wave to your friends and get the party started!
					</BaseText>
					<BaseRow direction="column" alignment="center" spacing={1}>
						<BaseText variant="secondary-title">Members</BaseText>
						<Awaiting fetchStatus={membersFs}>
							{members?.map((member) => (
								<UserListRow user={member} />
							))}
						</Awaiting>
					</BaseRow>
				</div>
			</BaseRow>
		</CurrentClusterContext.Provider>
	);
}
