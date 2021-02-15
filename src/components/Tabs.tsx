import {useState} from 'react';
import ClustersTab from '../pages/ClustersTab/ClustersTab';
import ExploreTab from '../pages/ExploreTab/ExploreTab';
import FriendsTab from '../pages/FriendsTab/FriendsTab';
import BaseRow from './base/BaseRow';
import BaseText from './base/BaseText';

type Tab = 'explore' | 'friends' | 'clusters';

/**
 * Contains three tabs: the Explore tab, the Friends tab, and the Clusters tab.
 * This <Tabs/> component renders the tab selector buttons as well as the content
 * of the selected tab.
 */
export default function Tabs() {
	let [tab, setTab] = useState<Tab>('explore');

	return (
		<BaseRow direction="column" alignment="center" width="100%">
			<BaseRow direction="row" spacing={1} justifyContent="center" rails={1}>
				<BaseText variant="list-item-title" onClick={() => setTab('explore')}>
					Explore
				</BaseText>
				<BaseText variant="list-item-title" onClick={() => setTab('friends')}>
					Friends
				</BaseText>
				<BaseText variant="list-item-title" onClick={() => setTab('clusters')}>
					Clusters
				</BaseText>
			</BaseRow>

			{tab === 'explore' ? (
				<ExploreTab />
			) : tab === 'friends' ? (
				<FriendsTab />
			) : (
				<ClustersTab />
			)}
		</BaseRow>
	);
}
