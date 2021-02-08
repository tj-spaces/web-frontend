import {useState} from 'react';
import useCluster from '../../hooks/useCluster';
import useSpacesInCluster from '../../hooks/useSpacesInCluster';
import {createStylesheet} from '../../styles/createStylesheet';
import BackgroundColorContext from '../BackgroundColorContext';
import BaseScrollableArea from '../Base/BaseScrollableArea';
import BaseText from '../Base/BaseText';
import ClusterSettingsModal from './ClusterSettingsModal';
import ClusterSpaceList from './ClusterSpaceList';
import ClusterIdContext from './CurrentClusterContext';

export const styles = createStylesheet({
	clusterLayout: {
		backgroundColor: 'var(--white)',
		padding: '0.5em 0em',
		display: 'flex',
		flexDirection: 'row',
		height: '100%',
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
		<BaseScrollableArea>
			<ClusterIdContext.Provider value={{id, spaces}}>
				{isSettingsOpen && (
					<ClusterSettingsModal onClose={() => setIsSettingsOpen(false)} />
				)}

				<BaseText variant="primary-title">
					{cluster?.name ?? 'Loading...'}{' '}
					<span onClick={() => setIsSettingsOpen(true)}>
						<i className="fas fa-cog pressable"></i>
					</span>
				</BaseText>
				<div className={styles('clusterLayout')}>
					<BackgroundColorContext.Provider value="light">
						<BaseScrollableArea railPadding="railPadding" style={{flex: 1}}>
							<BaseText variant="secondary-title">Spaces</BaseText>
							<ClusterSpaceList spaces={spaces} />
						</BaseScrollableArea>
						<BaseScrollableArea railPadding="railPadding" style={{flex: 2}}>
							<BaseText variant="secondary-title">Posts</BaseText>
						</BaseScrollableArea>
					</BackgroundColorContext.Provider>
				</div>
			</ClusterIdContext.Provider>
		</BaseScrollableArea>
	);
}
