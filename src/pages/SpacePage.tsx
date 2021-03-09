/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useParams} from 'react-router-dom';
import SpaceWrapper from '../components/space/SpaceWrapper';

export default function SpacePage() {
	const {spaceId} = useParams<{spaceId: string}>();

	return <SpaceWrapper id={spaceId} />;
}
