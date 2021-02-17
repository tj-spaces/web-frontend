import {getSpaceJoinCode} from '../api/spaces';
import {SIM_SERVER_URL} from '../lib/constants';

export default async function joinSpace(
	id: string
): Promise<{connection: WebSocket; twilioGrant: string}> {
	const {code, twilioGrant} = await getSpaceJoinCode(id);
	const ws = new WebSocket(SIM_SERVER_URL);

	return new Promise((resolve, reject) => {
		ws.onopen = () => ws.send('connect:' + code);

		const onMessage = (ev: MessageEvent<string>) => {
			console.log(ev);
			// Immediately remove this event hook after the first message
			ws.removeEventListener('message', onMessage);

			if (ev.data === 'auth') {
				resolve({connection: ws, twilioGrant});
			} else if (ev.data === 'noauth') {
				reject({error: 'noauth'});
			} else {
				reject({error: 'invalid_message_event'});
			}
		};

		ws.addEventListener('message', onMessage);
	});
}
