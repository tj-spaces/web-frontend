import React from 'react';
import ClusterExplorer from './ClusterExplorer';
import Navbar from '../../components/Navbar/Navbar';
import { createStylesheet } from '../../styles/createStylesheet';

const styles = createStylesheet({
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: '100vw',
		height: '100vh'
	}
});

export default function HomePage() {
	document.title = 'Home';

	return (
		<div className={styles.container}>
			<Navbar />
			<ClusterExplorer />
		</div>
	);
}
