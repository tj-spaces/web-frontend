/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {getSpaceJoinCode} from '../api/spaces';
import {
	USE_DEV_SIMULATION_SERVER,
	USE_DEV_VOICE_SERVER,
} from '../lib/constants';

export default async function joinSpace(
	id: string
): Promise<{voiceURL: string; simulationURL: string}> {
	const joinInfo = await getSpaceJoinCode(id);
	const simulationURL = USE_DEV_SIMULATION_SERVER
		? 'localhost:7000'
		: joinInfo.simulationURL;

	const voiceURL = USE_DEV_VOICE_SERVER ? 'localhost:443' : joinInfo.voiceURL;

	return {
		voiceURL,
		simulationURL,
	};
}
