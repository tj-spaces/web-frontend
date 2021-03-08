import {getSpaceJoinCode} from '../api/spaces';

export default async function joinSpace(
	id: string
): Promise<{connection: WebSocket; voiceURL: string; simulationURL: string}> {
	const {code, voiceURL, simulationURL} = await getSpaceJoinCode(id);
	const ws = new WebSocket('ws://' + simulationURL);

	return new Promise((resolve, reject) => {
		ws.onopen = () => {
			ws.send('connect:' + code);
			resolve({connection: ws, voiceURL, simulationURL});
		};
		ws.onerror = reject;
	});
}
