/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {getSpaceJoinCode} from '../api/spaces';
import {
	DISABLE_DEV_SIMULATION_SERVER_SSL,
	USE_DEV_SIMULATION_SERVER,
	USE_DEV_VOICE_SERVER,
} from '../lib/constants';

export default async function joinSpace(
	id: string
): Promise<{connection: WebSocket; voiceURL: string; simulationURL: string}> {
	const joinInfo = await getSpaceJoinCode(id);
	const simulationURL = USE_DEV_SIMULATION_SERVER
		? 'localhost:7000'
		: joinInfo.simulationURL;

	const voiceURL = USE_DEV_VOICE_SERVER ? 'localhost:8080' : joinInfo.voiceURL;
	const ws = new WebSocket(
		(DISABLE_DEV_SIMULATION_SERVER_SSL ? 'ws' : 'wss') + '://' + simulationURL
	);

	return new Promise((resolve, reject) => {
		ws.onopen = () => {
			ws.send('connect:' + joinInfo.code);
			resolve({
				connection: ws,
				voiceURL,
				simulationURL,
			});
		};
		ws.onerror = reject;
	});
}
