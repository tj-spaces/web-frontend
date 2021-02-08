import {useState} from 'react';
import useCluster from '../../hooks/useCluster';
import useSpacesInCluster from '../../hooks/useSpacesInCluster';
import {createStylesheet} from '../../styles/createStylesheet';
import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';
import ClusterSettingsModal from './ClusterSettingsModal';
import ClusterSpaceList from './ClusterSpaceList';
import ClusterIDContext from './CurrentClusterContext';

export const styles = createStylesheet({
	clusterLayout: {
		backgroundColor: 'var(--bg-secondary)',
		padding: '0.5em 0em',
		display: 'flex',
		flexDirection: 'row',
		height: '100%',
		width: '100%',
	},
});

/**
 * Renders the main page for a cluster. This includes the list of Spaces and list of Posts in the cluster.
 * It also holds the button for displaying or hiding the settings.
 */
export default function Cluster({id}: {id: string}) {
	const cluster = useCluster(id);
	const spaces = useSpacesInCluster(id) ?? [];
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	return (
		<BaseRow direction="column" overflow="auto" width="100%" height="100%">
			<ClusterIDContext.Provider value={{id, spaces}}>
				{isSettingsOpen && (
					<ClusterSettingsModal onClose={() => setIsSettingsOpen(false)} />
				)}

				<BaseText variant="primary-title" alignment="center">
					{cluster?.name ?? 'Loading...'}{' '}
					<span onClick={() => setIsSettingsOpen(true)}>
						<i className="fas fa-cog pressable"></i>
					</span>
				</BaseText>
				<div className={styles('clusterLayout')}>
					<BaseRow direction="column" flex={1} rails={2} overflow="auto">
						<BaseText variant="secondary-title">Spaces</BaseText>
						<ClusterSpaceList spaces={spaces} />
					</BaseRow>
					<BaseRow direction="column" flex={1} rails={2} overflow="auto">
						<BaseText variant="secondary-title">Posts</BaseText>
					</BaseRow>
				</div>
			</ClusterIDContext.Provider>
		</BaseRow>
	);
}
