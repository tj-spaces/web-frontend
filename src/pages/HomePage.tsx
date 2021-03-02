import React from 'react';
import Navbar from '../components/Navbar';
import {createStylesheet} from '../styles/createStylesheet';
import Tabs from '../components/Tabs';
import Sidebar from '../components/Sidebar';

const styles = createStylesheet({
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '100%',
	},
	'sidebar-container': {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
	},
});

/**
 * Wrapper page to render the Navbar and the Space Feed.
 */
export default function HomePage() {
	document.title = 'Home | Nebula';

	return (
		<div className={styles('container')}>
			<Navbar />
			<div className={styles('sidebar-container')}>
				<Sidebar />
				<Tabs />
			</div>
		</div>
	);
}
