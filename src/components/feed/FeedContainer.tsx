import {useEffect, useState} from 'react';
import {getSuggestedSpaces} from '../../api/api';
import {SpaceSession} from '../../typings/SpaceSession';
import CenteredLoadingText from '../CenteredLoadingText';
import Feed from './Feed';

/**
 * Wrapper component that fetches data for the feed and renders it.
 */
export default function FeedContainer() {
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
		return <Feed spaces={spaces} />;
	}
}
