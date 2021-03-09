/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useParams} from 'react-router-dom';
import Cluster from '../components/cluster/Cluster';
import Navbar from '../components/Navbar';
import {createStylesheet} from '../styles/createStylesheet';

const styles = createStylesheet({
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: '100vw',
		height: '100vh',
	},
});

/**
 * Wrapper to render the navbar and a cluster.
 */
export default function ClusterPage() {
	const {clusterId} = useParams<{clusterId: string}>();

	return (
		<div className={styles('container')}>
			<Navbar />
			<Cluster id={clusterId} />
		</div>
	);
}
