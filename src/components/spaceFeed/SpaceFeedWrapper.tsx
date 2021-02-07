import { useEffect, useState } from 'react';
import { getSuggestedSpaces } from '../../api/api';
import { createStylesheet } from '../../styles/createStylesheet';
import { SpaceSession } from '../../typings/SpaceSession';
import CenteredLoadingText from '../CenteredLoadingText';
import FriendList from '../friendList/FriendList';
import SpaceFeed from './SpaceFeed';

export const styles = createStylesheet({
	feedWrapper: {
		width: '100%',
		maxHeight: '100vh',
		overflowY: 'scroll'
	}
});

export default function SpaceFeedWrapper() {
	const [spaces, setSpaces] = useState<SpaceSession[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		(async () => {
			const spaces = await getSuggestedSpaces();
			setSpaces(spaces);
			setLoading(false);
		})();
	}, []);

	if (loading) {
		return <CenteredLoadingText />;
	} else {
		return (
			<div className={styles('feedWrapper')}>
				<FriendList />
				<SpaceFeed spaces={spaces} />
			</div>
		);
	}
}
