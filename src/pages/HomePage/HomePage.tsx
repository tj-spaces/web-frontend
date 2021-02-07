import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { createStylesheet } from '../../styles/createStylesheet';
import SpaceFeedWrapper from '../../components/spaceFeed/SpaceFeedWrapper';

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
		<div className={styles('container')}>
			<Navbar />
			<SpaceFeedWrapper />
		</div>
	);
}
