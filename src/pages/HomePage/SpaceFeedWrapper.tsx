import { useEffect, useState } from 'react';
import { getMyClusters, getSpacesInCluster } from '../../api/api';
import CenteredLoadingText from '../../components/CenteredLoadingText';
import { createStylesheet } from '../../styles/createStylesheet';
import { ISpace } from '../../typings/Space';
import SpaceFeed from './SpaceFeed';

export const styles = createStylesheet({
	feedWrapper: {
		maxHeight: '100vh',
		overflowY: 'scroll'
	}
});

export default function SpaceFeedWrapper() {
	const [spaces, setSpaces] = useState<ISpace[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		(async () => {
			const clusters = await getMyClusters();
			const combinedSpaces: ISpace[] = [];
			for (let cluster of clusters) {
				const spaces = await getSpacesInCluster(cluster.id);
				combinedSpaces.push(...spaces);
			}
			setSpaces(combinedSpaces);
			setLoading(false);
		})();
	}, []);

	if (loading) {
		return <CenteredLoadingText />;
	} else {
		return (
			<div className={styles.feedWrapper}>
				<SpaceFeed spaces={spaces} />
			</div>
		);
	}
}
