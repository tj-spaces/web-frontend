import {useEffect, useState} from 'react';
import {getSpaceSession} from '../api/api';
import {Space} from '../typings/Space';

export default function useSpace(spaceID: string | null) {
	const [space, setSpace] = useState<Space>();

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
