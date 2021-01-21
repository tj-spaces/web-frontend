import { useEffect, useState } from 'react';
import { getSpace } from '../api/api';
import { ISpace } from '../typings/Space';

export default function useSpace(clusterId: string, spaceId: string) {
	const [space, setSpace] = useState<ISpace>();

	useEffect(() => {
		getSpace(clusterId, spaceId).then((space) => {
			setSpace(space);
		});
	}, [clusterId, spaceId]);

	return space;
}
