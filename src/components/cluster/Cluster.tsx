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
import BaseRow from '../base/BaseRow';
import ClusterSettingsTab from './tabs/ClusterSettingsTab';
import ClusterSidebar from './ClusterSidebar';
import ClusterTabContext, {ClusterTab} from './ClusterTabContext';
import CurrentClusterContext from './CurrentClusterContext';
import ClusterHubTab from './tabs/ClusterHubTab';

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
	const [isSidebarOpen] = useState(true);
	const [tab, setTab] = useState<ClusterTab>('hub');

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
			<ClusterTabContext.Provider value={{tab, setTab}}>
				<BaseRow
					direction="row"
					rails={1}
					backgroundColor="bgSecondary"
					width="100%"
					height="100%"
				>
					<ClusterSidebar clusterName={cluster.name} isOpen={isSidebarOpen} />
					<div className={styles('clusterContent')}>
						{tab === 'hub' ? (
							<ClusterHubTab members={members} membersFs={membersFs} />
						) : tab === 'settings' ? (
							<ClusterSettingsTab cluster={cluster} />
						) : (
							<h1 style={{textAlign: 'center'}}>Tab under construction</h1>
						)}
					</div>
				</BaseRow>
			</ClusterTabContext.Provider>
		</CurrentClusterContext.Provider>
	);
}
