import Box from '../../components/Box/Box';
import ClustersJoinedByMe from '../../components/ClustersJoinedByMe/ClustersJoinedByMe';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

export default function HomePage() {
	document.title = 'Home';

	return (
		<ErrorBoundary>
			<Box display="flex-column" width="50%" margin="x-auto">
				<ClustersJoinedByMe />
			</Box>
		</ErrorBoundary>
	);
}
