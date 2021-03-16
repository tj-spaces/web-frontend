import {createContext} from 'react';

export type ClusterTab =
	| 'hub'
	| 'posts'
	| 'text-channels'
	| 'members'
	| 'spaces'
	| 'settings';

export type ClusterTabData = {
	tab: ClusterTab;
	setTab: (tab: ClusterTab) => void;
};

/**
 * This context stores the currently-active tab in the cluster.
 */
const ClusterTabContext = createContext<ClusterTabData>(null!);

export default ClusterTabContext;
