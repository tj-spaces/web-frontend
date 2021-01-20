import ClusterCreateButton from '../../components/ClusterCreateButton/ClusterCreateButton';
import ClustersJoinedByMe from '../../components/ClustersJoinedByMe/ClustersJoinedByMe';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

export default function HomePage() {
	document.title = 'Home';

	return (
		<ErrorBoundary>
			<ClustersJoinedByMe />
			<ClusterCreateButton />
		</ErrorBoundary>
	);
}
