import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import useCluster from '../../hooks/useCluster';
import useSpacesInCluster from '../../hooks/useSpacesInCluster';
import { createStylesheet } from '../../styles/createStylesheet';
import AuthContext from '../AuthContext';
import BackgroundColorContext from '../BackgroundColorContext';
import BaseScrollableArea from '../Base/BaseScrollableArea';
import BaseText from '../Base/BaseText';
import Space from '../Space/Space';
import ClusterSettingsModal from './ClusterSettingsModal';
import SpaceList from './ClusterSpaceList';
import ClusterIdContext from './CurrentClusterContext';

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
		<BaseScrollableArea>
			<ClusterIdContext.Provider value={{ id, spaces }}>
				{isSettingsOpen && <ClusterSettingsModal onClose={() => setIsSettingsOpen(false)} />}

				<BaseText variant="heading" fontSize="xl">
					{cluster?.name ?? 'Loading...'}{' '}
					<span onClick={() => setIsSettingsOpen(true)}>
						<i className="fas fa-cog pressable"></i>
					</span>
				</BaseText>
				{spaceId && (isLoggedIn ? <Space id={spaceId} /> : <h1>Authenticating...</h1>)}
				<div className={styles.clusterLayout}>
					<BackgroundColorContext.Provider value="light">
						<BaseScrollableArea railPadding="railPadding" style={{ flex: 1 }}>
							<BaseText fontSize="xl" fontWeight="bold">
								Spaces
							</BaseText>
							<SpaceList spaces={spaces} />
						</BaseScrollableArea>
						<BaseScrollableArea railPadding="railPadding" style={{ flex: 2 }}>
							<BaseText fontSize="xl" fontWeight="bold">
								Posts
							</BaseText>
						</BaseScrollableArea>
					</BackgroundColorContext.Provider>
				</div>
			</ClusterIdContext.Provider>
		</BaseScrollableArea>
	);
}
