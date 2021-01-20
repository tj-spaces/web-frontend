import ClusterList from '../../components/ClusterList/ClusterList';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import useMyClusters from '../../hooks/useMyClusters';

export default function HomePage() {
	document.title = 'Home';

	const myClusters = useMyClusters();

	if (!myClusters) {
		return <LoadingScreen />;
	}

	return <ClusterList clusters={myClusters} />;
}
