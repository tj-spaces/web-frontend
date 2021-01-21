import axios, { AxiosResponse } from 'axios';
import { API_SERVER_URL } from '../lib/constants';
import getSessionId from '../lib/getSessionId';
import { ICluster, ClusterVisibility } from '../typings/Cluster';
import { ISpace } from '../typings/Space';
import { IUser } from '../typings/User';

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

export function makeAPIPostCall(url: string, data: any) {
	return new Promise<AxiosResponse>((resolve, reject) => {
		axios
			.post(url, data, { headers: { Authorization: 'Bearer ' + getSessionId() } })
			.then((successfulResponse) => resolve(successfulResponse))
			.catch((error) => {
				if (error.response.status === 401) {
					localStorage.removeItem('session_id');
				} else {
					reject(new APIError('/api/users/@me', error.response.data.error));
				}
			});
	});
}

export function makeAPIGetCall(url: string) {
	return new Promise<AxiosResponse>((resolve, reject) => {
		axios
			.get(url, {
				headers: { Authorization: 'Bearer ' + getSessionId() }
			})
			.then((successfulResponse) => resolve(successfulResponse))
			.catch((error) => {
				if (error.response.status === 401) {
					localStorage.removeItem('session_id');
				} else {
					reject(new APIError(url, error.response.data.error));
				}
			});
	});
}

export async function getDiscoverableClusters(): Promise<ICluster[]> {
	return (await makeAPIGetCall('/api/discoverable-clusters')).data.clusters;
}

export async function getMyClusters(): Promise<ICluster[]> {
	return (await makeAPIGetCall('/api/users/@me/clusters')).data.clusters;
}

export async function createCluster(name: string, visibility: ClusterVisibility): Promise<string> {
	return (await makeAPIPostCall('/api/clusters', { name, visibility })).data.cluster_id;
}

export async function createSpace(clusterId: string, name: string): Promise<string> {
	return (await makeAPIPostCall('/api/clusters/' + clusterId + '/spaces', { name })).data.space_id;
}

export async function getCluster(id: string): Promise<ICluster> {
	return (await makeAPIGetCall('/api/clusters/' + id)).data.cluster;
}

export async function getMe(): Promise<IUser> {
	return (await makeAPIGetCall('/api/users/@me')).data.user;
}

export async function getSpace(spaceId: string): Promise<ISpace> {
	return (await makeAPIGetCall('/api/spaces/' + spaceId)).data.space;
}

export async function getSpacesInCluster(id: string): Promise<ISpace[]> {
	return (await makeAPIGetCall('/api/clusters/' + id + '/spaces')).data.spaces;
}
