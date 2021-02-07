import React from 'react';
import Navbar from '../../components/Navbar';
import {createStylesheet} from '../../styles/createStylesheet';
import FeedWrapper from '../../components/spaceFeed/FeedWrapper';

const styles = createStylesheet({
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: '100vw',
		height: '100vh',
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
			<FeedWrapper />
		</div>
	);
}
