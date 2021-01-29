import { useContext } from 'react';
import CurrentSpaceContext from '../../Space/CurrentSpaceContext';

export default function ClusterSpacePanel() {
	const spaceId = useContext(CurrentSpaceContext);

	if (spaceId == null) {
		throw new Error('spaceId is null, and spacePanel is active');
	}
}
