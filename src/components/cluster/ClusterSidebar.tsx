import {Link} from 'react-router-dom';
import colors from '../../styles/colors';
import {createStylesheet} from '../../styles/createStylesheet';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import SidebarItem from '../SidebarItem';

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
	sections,
	selectedItemType,
	selectedItemID,
	isOpen,
}: {
	clusterName: string;
	sections: ClusterSidebarSection[];
	selectedItemType?: 'space' | 'post-channel' | 'text-channel';
	selectedItemID?: string;
	isOpen: boolean;
}) {
	if (!isOpen) {
		return null;
	}

	return (
		<BaseRow direction="column" xstyle={styles.sidebar}>
			<div className={styles('clusterName')}>
				<BaseText variant="secondary-title">{clusterName}</BaseText>
				<Link to="/">Home</Link>
			</div>
			<SidebarItem>Hub</SidebarItem>
			<SidebarItem>Posts</SidebarItem>
			<SidebarItem>Members</SidebarItem>
			<SidebarItem>Spaces</SidebarItem>
			<SidebarItem>Text Channels</SidebarItem>
			<SidebarItem>Settings</SidebarItem>
		</BaseRow>
	);
}
