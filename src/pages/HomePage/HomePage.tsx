import React from 'react';
import Navbar from '../../components/Navbar';
import {createStylesheet} from '../../styles/createStylesheet';
import FeedContainer from '../../components/feed/FeedContainer';
import FriendsSection from '../../components/friendsSection/FriendsSection';
import ClusterSection from '../../components/clusterSection/ClusterSection';

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
			<FriendsSection />
			<ClusterSection />
			<FeedContainer />
		</div>
	);
}
