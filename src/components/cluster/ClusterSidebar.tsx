/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useContext} from 'react';
import {Link} from 'react-router-dom';
import colors from '../../styles/colors';
import {createStylesheet} from '../../styles/createStylesheet';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import SidebarItem from '../SidebarItem';
import ClusterTabContext from './ClusterTabContext';

export type ClusterSidebarSectionItem =
	| {
			type: 'text-channel';
			name: string;
			id: string;
	  }
	| {
			type: 'post-channel';
			name: string;
			id: string;
	  }
	| {
			type: 'space';
			name: string;
			id: string;
	  };

const styles = createStylesheet({
	sidebar: {
		flex: 1,
		height: '100%',
		backgroundColor: colors.bgSecondary,
		padding: '1rem',
	},
	clusterName: {
		marginBottom: '2rem',
	},
});

export interface ClusterSidebarSection {
	name: string;
	items: ClusterSidebarSectionItem[];
}

export default function ClusterSidebar({
	clusterName,
	isOpen,
}: {
	clusterName: string;
	isOpen: boolean;
}) {
	const {tab, setTab} = useContext(ClusterTabContext);

	if (!isOpen) {
		return null;
	}

	return (
		<BaseRow direction="column" xstyle={styles.sidebar}>
			<div className={styles('clusterName')}>
				<BaseText variant="secondary-title">{clusterName}</BaseText>
				<Link to="/">Home</Link>
			</div>
			<SidebarItem selected={tab === 'hub'} onClick={() => setTab('hub')}>
				Hub
			</SidebarItem>
			<SidebarItem selected={tab === 'posts'} onClick={() => setTab('posts')}>
				Posts
			</SidebarItem>
			<SidebarItem
				selected={tab === 'members'}
				onClick={() => setTab('members')}
			>
				Members
			</SidebarItem>
			<SidebarItem selected={tab === 'spaces'} onClick={() => setTab('spaces')}>
				Spaces
			</SidebarItem>
			<SidebarItem
				selected={tab === 'text-channels'}
				onClick={() => setTab('text-channels')}
			>
				Text Channels
			</SidebarItem>
			<SidebarItem
				selected={tab === 'settings'}
				onClick={() => setTab('settings')}
			>
				Settings
			</SidebarItem>
		</BaseRow>
	);
}
