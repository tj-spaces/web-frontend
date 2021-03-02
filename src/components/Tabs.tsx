import {useState} from 'react';
import ClustersTab from '../pages/ClustersTab';
import ExploreTab from '../pages/ExploreTab';
import FriendsTab from '../pages/FriendsTab';
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
		<BaseRow
			direction="column"
			alignment="center"
			width="100%"
			height="100%"
			overflow="scroll"
		>
			<BaseRow direction="row" spacing={1} justifyContent="center" rails={1}>
				<BaseText
					variant="list-item-title"
					onClick={() => setTab('clusters')}
					underline={tab === 'clusters'}
					unselectable
				>
					Home
				</BaseText>
				<BaseText
					variant="list-item-title"
					onClick={() => setTab('explore')}
					underline={tab === 'explore'}
					unselectable
				>
					Explore
				</BaseText>
				{/* <BaseText
					variant="list-item-title"
					onClick={() => setTab('friends')}
					underline={tab === 'friends'}
					unselectable
				>
					Friends
				</BaseText> */}
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
