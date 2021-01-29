import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import useCluster from '../../hooks/useCluster';
import useSpacesInCluster from '../../hooks/useSpacesInCluster';
import AuthContext from '../AuthContext/AuthContext';
import ClusterSettingsModal from './ClusterSettingsModal/ClusterSettingsModal';
import ClusterIdContext from './CurrentClusterContext/CurrentClusterContext';
import Space from '../Space/Space';
import SpaceList from '../SpaceList/SpaceList';
import { createStylesheet } from '../../styles/createStylesheet';
import BackgroundColorContext from '../BackgroundColorContext/BackgroundColorContext';
import Typography from '../BaseText/BaseText';
import ScrollableArea from '../ScrollableArea/ScrollableArea';

export const styles = createStylesheet({
	clusterLayout: {
		backgroundColor: 'var(--spaces-color-light-1)',
		padding: '0.5em 0em',
		display: 'flex',
		flexDirection: 'row',
		height: '100%'
	}
});

export default function Cluster({ id }: { id: string }) {
	const cluster = useCluster(id);
	const spaces = useSpacesInCluster(id) ?? [];
	const { spaceId } = useParams<{ spaceId?: string }>();
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const { isLoggedIn } = useContext(AuthContext);

	return (
		<ScrollableArea>
			<ClusterIdContext.Provider value={{ id, spaces }}>
				{isSettingsOpen && <ClusterSettingsModal onClose={() => setIsSettingsOpen(false)} />}

				<Typography variant="heading" fontSize="xl">
					{cluster?.name ?? 'Loading...'}{' '}
					<span onClick={() => setIsSettingsOpen(true)}>
						<i className="fas fa-cog pressable"></i>
					</span>
				</Typography>
				{spaceId && (isLoggedIn ? <Space id={spaceId} /> : <h1>Authenticating...</h1>)}
				<div className={styles.clusterLayout}>
					<BackgroundColorContext.Provider value="light">
						<ScrollableArea railPadding="railPadding" style={{ flex: 1 }}>
							<Typography fontSize="xl" fontWeight="bold">
								Spaces
							</Typography>
							<SpaceList spaces={spaces} />
						</ScrollableArea>
						<ScrollableArea railPadding="railPadding" style={{ flex: 2 }}>
							<Typography fontSize="xl" fontWeight="bold">
								Posts
							</Typography>
						</ScrollableArea>
					</BackgroundColorContext.Provider>
				</div>
			</ClusterIdContext.Provider>
		</ScrollableArea>
	);
}
