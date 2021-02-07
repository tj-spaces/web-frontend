import React from 'react';
import ClusterExplorer from './ClusterExplorer';
import Navbar from '../../components/Navbar';
import {createStylesheet} from '../../styles/createStylesheet';

const styles = createStylesheet({
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: '100vw',
		height: '100vh',
	},
});

/**
 * Wrapper page to display a cluster explorer.
 */
export default function ClusterExplorerPage() {
	document.title = 'Explore Clusters';

	return (
		<div className={styles('container')}>
			<Navbar />
			<ClusterExplorer />
		</div>
	);
}
