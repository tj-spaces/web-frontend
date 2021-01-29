import React from 'react';
import ClusterExplorer from '../../components/ClusterExplorer/ClusterExplorer';
import Sidebar from '../../components/Sidebar/Sidebar';
import { createStylesheet } from '../../styles/createStylesheet';

export const styles = createStylesheet({
	clusterExplorerPage: {
		display: 'flex',
		flexDirection: 'row',
		width: '100vw',
		height: '100vh'
	}
});

export default function HomePage() {
	document.title = 'Home';

	return (
		<div className={styles.clusterExplorerPage}>
			<Sidebar />
			<ClusterExplorer />
		</div>
	);
}
