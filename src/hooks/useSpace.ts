import {useEffect, useState} from 'react';
import {getSpace} from '../api/api';
import {Space} from '../typings/Space';

export default function useSpace(spaceID: string | null) {
	const [space, setSpace] = useState<Space>();

	useEffect(() => {
		if (spaceID) {
			getSpace(spaceID).then((space) => {
				setSpace(space);
			});
		} else {
			setSpace(undefined);
		}
	}, [spaceID]);

	return space;
}
