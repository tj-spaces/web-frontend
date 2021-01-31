import React from 'react';
import { useParams } from 'react-router-dom';
import Cluster from '../../components/Cluster/Cluster';
import Sidebar from '../../components/Sidebar/Sidebar';
import { createStylesheet } from '../../styles/createStylesheet';

export const styles = createStylesheet({
	container: {
		display: 'flex',
		flexDirection: 'row',
		width: '100vw',
		height: '100vh'
	}
});

export default function ClusterPage() {
	document.title = 'Home';

	const { clusterId } = useParams<{ clusterId: string }>();

	return (
		<div className={styles.container}>
			<Sidebar />
			<Cluster id={clusterId} />
		</div>
	);
}
