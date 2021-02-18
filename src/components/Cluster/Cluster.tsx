import React, {useEffect, useState} from 'react';
import {getClusterMembers, useCluster} from '../../api/clusters';
import {FetchStatus} from '../../api/FetchStatus';
import {createStylesheet} from '../../styles/createStylesheet';
import {PublicUserInfo} from '../../typings/PublicUserInfo';
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
	const cluster = useCluster(id);
	const [members, setMembers] = useState<PublicUserInfo[]>([]);
	const [membersFs, setMembersFs] = useState<FetchStatus>(null);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [isSidebarOpen] = useState(true);

	useEffect(() => {
		setMembersFs('loading');
		(async () => {
			try {
				setMembers(await getClusterMembers(id));
				setMembersFs('loaded');
			} catch (err) {
				setMembersFs('errored');
			}
		})();
	}, [id]);

	if (cluster == null) {
		return null;
	}

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
							{members.map((member) => (
								<UserListRow user={member} />
							))}
						</Awaiting>
					</BaseRow>
				</div>
			</BaseRow>
		</CurrentClusterContext.Provider>
	);
}
