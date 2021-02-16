import {createStylesheet} from '../../styles/createStylesheet';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';

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
		position: 'absolute',
		left: '0px',
		top: '0px',
		bottom: '0px',
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
		<BaseRow direction="column" rails={1} xstyle={styles.sidebar}>
			<BaseText variant="secondary-title">{clusterName}</BaseText>
		</BaseRow>
	);
}
