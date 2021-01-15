import { useEffect, useState } from 'react';
import { getMySpaces } from '../api/api';
import { ISpace } from '../typings/Space';

export default function useMySpaces() {
	const [spaces, setSpaces] = useState<ISpace[]>();

	useEffect(() => {
		getMySpaces().then((spaces) => setSpaces(spaces));
	}, []);

	return spaces;
}
