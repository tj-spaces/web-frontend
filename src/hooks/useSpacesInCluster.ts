/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useEffect, useState} from 'react';
import {getSpacesInCluster} from '../api/spaces';
import {Space} from '../typings/Space';

export default function useSpacesInCluster(clusterID: string) {
	const [spaces, setSpaces] = useState<Space[]>();

	useEffect(() => {
		getSpacesInCluster(clusterID).then((spaces) => setSpaces(spaces));

		// Reset to empty array
		return () => setSpaces(undefined);
	}, [clusterID]);

	return spaces;
}
