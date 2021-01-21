import { useEffect, useState } from 'react';
import { getSpace } from '../api/api';
import { ISpace } from '../typings/Space';

export default function useSpace(spaceId: string) {
	const [space, setSpace] = useState<ISpace>();

	useEffect(() => {
		getSpace(spaceId).then((space) => {
			setSpace(space);
		});
	}, [spaceId]);

	return space;
}
