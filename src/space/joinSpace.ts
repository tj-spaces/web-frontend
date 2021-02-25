import {getSpaceJoinCode} from '../api/spaces';
import {SIM_SERVER_URL} from '../lib/constants';

export default async function joinSpace(
	id: string
): Promise<{connection: WebSocket; twilioGrant: string}> {
	const {code, twilioGrant} = await getSpaceJoinCode(id);
	const ws = new WebSocket(SIM_SERVER_URL);

	return new Promise((resolve, reject) => {
		ws.onopen = () => {
			ws.send('connect:' + code);
			resolve({connection: ws, twilioGrant});
		};
		ws.onerror = reject;
	});
}
