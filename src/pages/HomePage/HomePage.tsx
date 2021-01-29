import React from 'react';
import { useParams } from 'react-router-dom';
import Box from '../../components/Box/Box';
import Cluster from '../../components/Cluster/Cluster';
import Sidebar from '../../components/Sidebar/Sidebar';
import { classes, createStylesheet } from '../../styles/createStylesheet';

let styles = createStylesheet({
	container: {
		display: 'flex',
		flexDirection: 'row',
		width: '100vw',
		height: '100vh'
	}
});

export default function HomePage() {
	document.title = 'Home';

	const { clusterId } = useParams<{ clusterId?: string; spaceId?: string }>();

	return (
		<Box className={classes(styles.container)}>
			<Sidebar />
			{clusterId && <Cluster id={clusterId} />}
		</Box>
	);
}
