import { useEffect, useState } from 'react';
import { getSpace } from '../api/api';
import { ISpace } from '../typings/Space';

export default function useSpace(spaceID: string | null) {
	const [space, setSpace] = useState<ISpace>();

	useEffect(() => {
		if (spaceID) {
			getSpace(spaceID).then((space) => {
				setSpace(space);
			});
		}
	}, [spaceID]);

	return space;
}
