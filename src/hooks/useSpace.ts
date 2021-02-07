import {useEffect, useState} from 'react';
import {getSpaceSession} from '../api/api';
import {SpaceSession} from '../typings/SpaceSession';

export default function useSpace(spaceID: string | null) {
	const [space, setSpace] = useState<SpaceSession>();

	useEffect(() => {
		if (spaceID) {
			getSpaceSession(spaceID).then((space) => {
				setSpace(space);
			});
		} else {
			setSpace(undefined);
		}
	}, [spaceID]);

	return space;
}
