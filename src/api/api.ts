import axios from 'axios';
import { API_SERVER_URL } from '../lib/constants';
import getSessionId from '../lib/getSessionId';
import { IChannel } from '../typings/Channel';
import { ICluster, ClusterVisibility } from '../typings/Cluster';

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

export async function getDiscoverableClusters(): Promise<ICluster[]> {
	const response = await axios.get('/api/discoverable-clusters', {
		headers: {
			Authorization: 'Bearer ' + getSessionId()
		}
	});

	if (response.status === 200) {
		return response.data.spaces;
	} else {
		throw new APIError('/api/discoverable-clusters', response.data.error);
	}
}

export async function getMyClusters(): Promise<ICluster[]> {
	const response = await axios.get('/api/users/@me/clusters', {
		headers: {
			Authorization: 'Bearer ' + getSessionId()
		}
	});

	if (response.status === 200) {
		return response.data.spaces;
	} else {
		throw new APIError('/api/users/@me/clusters', response.data.error);
	}
}

export async function createCluster(name: string, visibility: ClusterVisibility): Promise<void> {
	await axios.post(
		'/api/spaces/cluster',
		{ name, visibility },
		{ headers: { Authorization: 'Bearer ' + getSessionId() } }
	);
}

export async function getSpaces(clusterId: number): Promise<IChannel[]> {
	const response = await axios.post(
		'/api/clusters/' + clusterId + '/spaces',
		{ space_id: clusterId },
		{ headers: { Authorization: 'Bearer ' + getSessionId() } }
	);

	if (response.status === 200) {
		return response.data.channels;
	} else {
		throw new APIError('/api/clusters/' + clusterId + '/spaces', response.data.error);
	}
}
