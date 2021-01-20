import axios from 'axios';
import { API_SERVER_URL } from '../lib/constants';
import getSessionId from '../lib/getSessionId';
import { ICluster, ClusterVisibility } from '../typings/Cluster';
import { ISpace } from '../typings/Space';

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
		headers: { Authorization: 'Bearer ' + getSessionId() }
	});

	if (response.status === 200) {
		return response.data.spaces;
	} else {
		throw new APIError('/api/discoverable-clusters', response.data.error);
	}
}

export function getMyClusters(): Promise<ICluster[]> {
	return new Promise((resolve, reject) => {
		axios
			.get('/api/users/@me/clusters', {
				headers: { Authorization: 'Bearer ' + getSessionId() }
			})
			.then((successfulResponse) => resolve(successfulResponse.data.clusters))
			.catch((error) => {
				reject(new APIError('/api/users/@me/clusters', error.response.data.error));
			});
	});
}

export function createCluster(name: string, visibility: ClusterVisibility): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		axios
			.post('/api/clusters', { name, visibility }, { headers: { Authorization: 'Bearer ' + getSessionId() } })
			.then((successfulResponse) => {
				resolve(successfulResponse.data.cluster_id);
			})
			.catch((error) => {
				reject(new APIError('/api/clusters', error.response.data.error));
			});
	});
}

export function createSpace(clusterId: string, name: string): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		axios
			.post(
				'/api/clusters/' + clusterId + '/spaces',
				{ name },
				{ headers: { Authorization: 'Bearer ' + getSessionId() } }
			)
			.then((successfulResponse) => {
				resolve(successfulResponse.data.space_id);
			})
			.catch((error) => {
				reject(new APIError('/api/clusters/' + clusterId + '/spaces', error.response.data.error));
			});
	});
}

export function getCluster(id: string): Promise<ICluster> {
	return new Promise<ICluster>((resolve, reject) => {
		axios
			.get('/api/clusters/' + id, { headers: { Authorization: 'Bearer ' + getSessionId() } })
			.then((successfulResponse) => {
				resolve(successfulResponse.data.cluster);
			})
			.catch((error) => {
				reject(new APIError('/api/clusters', error.response.data.error));
			});
	});
}

export async function getSpacesInCluster(id: string): Promise<ISpace[]> {
	return new Promise<ISpace[]>((resolve, reject) => {
		axios
			.get('/api/clusters/' + id + '/spaces', { headers: { Authorization: 'Bearer ' + getSessionId() } })
			.then((successfulResponse) => {
				resolve(successfulResponse.data.spaces);
			})
			.catch((error) => {
				reject(new APIError('/api/clusters/' + id + '/spaces', error.response.data.error));
			});
	});
}
