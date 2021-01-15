import axios from 'axios';
import { API_SERVER_URL } from '../lib/constants';
import getSessionId from '../lib/getSessionId';
import { IChannel } from '../typings/Channel';
import { ISpace, SpaceVisibility } from '../typings/Space';

axios.defaults.baseURL = API_SERVER_URL;

class APIError extends Error {
	constructor(route: string, message: string) {
		super('API Error @' + route + ': ' + message);
	}
}

/**
 *
 * @param code The code sent by the OAuth provider
 * @param provider The provider that send the OAuth code
 */
export async function createSession(code: string, provider: string): Promise<string> {
	const response = await axios.post('/auth/create_session', {
		code,
		provider
	});

	if (response.status === 200) {
		return response.data.session_id;
	} else {
		throw new APIError('/auth/create_session', response.data.error);
	}
}

export async function getPublicSpaces(): Promise<ISpace[]> {
	const response = await axios.get('/api/spaces/public', {
		headers: {
			Authorization: 'Bearer ' + getSessionId()
		}
	});

	if (response.status === 200) {
		return response.data.spaces;
	} else {
		throw new APIError('/api/spaces/public', response.data.error);
	}
}

export async function getMySpaces(): Promise<ISpace[]> {
	const response = await axios.get('/api/spaces/list', {
		headers: {
			Authorization: 'Bearer ' + getSessionId()
		}
	});

	if (response.status === 200) {
		return response.data.spaces;
	} else {
		throw new APIError('/api/spaces/list', response.data.error);
	}
}

export async function createSpace(name: string, visibility: SpaceVisibility): Promise<void> {
	await axios.post(
		'/api/spaces/create',
		{ name, visibility },
		{ headers: { Authorization: 'Bearer ' + getSessionId() } }
	);
}

export async function getChannels(spaceId: number): Promise<IChannel[]> {
	const response = await axios.post(
		'/api/channels',
		{
			space_id: spaceId
		},
		{
			headers: {
				Authorization: 'Bearer ' + getSessionId()
			}
		}
	);

	if (response.status === 200) {
		return response.data.channels;
	} else {
		throw new APIError('/api/channels', response.data.error);
	}
}
