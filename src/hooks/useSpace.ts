import { useEffect, useState } from 'react';
import { getSpace } from '../api/api';
import { SpaceSession } from '../typings/SpaceSession';

export default function useSpace(spaceID: string | null) {
	const [space, setSpace] = useState<SpaceSession>();

	useEffect(() => {
		if (spaceID) {
			getSpace(spaceID).then((space) => {
				setSpace(space);
			});
		}
	}, [spaceID]);

	return space;
}
