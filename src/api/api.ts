import axios, { AxiosResponse } from 'axios';
import { API_SERVER_URL } from '../lib/constants';
import getSessionId from '../lib/getSessionId';
import { Cluster, ClusterVisibility } from '../typings/Cluster';
import { PublicUserInfo } from '../typings/PublicUserInfo';
import { SpaceSession, SpaceSessionVisibility } from '../typings/SpaceSession';
import { User } from '../typings/User';

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

export function graphql(query: string, variables?: any) {
	return new Promise<AxiosResponse>((resolve, reject) => {
		axios
			.post('/graphql', { query, variables }, { headers: { Authorization: 'Bearer ' + getSessionId() } })
			.then((successfulResponse) => {
				resolve(successfulResponse.data.data);
			})
			.catch((error) => {
				if (error.response.status === 401) {
					localStorage.removeItem('session_id');
					window.location.pathname = '/';
				} else {
					reject(new APIError('/api/users/@me', error.response.data.error));
				}
			});
	});
}

export function makeAPIPostCall(url: string, data?: any) {
	return new Promise<AxiosResponse>((resolve, reject) => {
		axios
			.post(url, data, { headers: { Authorization: 'Bearer ' + getSessionId() } })
			.then((successfulResponse) => resolve(successfulResponse))
			.catch((error) => {
				if (error.response.status === 401) {
					localStorage.removeItem('session_id');
					window.location.pathname = '/';
				} else {
					reject(new APIError(url, error.response.data.error));
				}
			});
	});
}

export function makeAPIGetCall(url: string, params?: Record<string, string | undefined>) {
	if (params) {
		// Stringify the parameters
		let stringifiedParameters = '';
		for (let [name, value] of Object.entries(params)) {
			if (value) {
				stringifiedParameters += encodeURIComponent(name) + '=' + encodeURIComponent(value);
			}
		}
		if (stringifiedParameters) {
			url += '?' + stringifiedParameters;
		}
	}
	return new Promise<AxiosResponse>((resolve, reject) => {
		axios
			.get(url, {
				headers: { Authorization: 'Bearer ' + getSessionId() }
			})
			.then((successfulResponse) => resolve(successfulResponse))
			.catch((error) => {
				if (error.response.status === 401) {
					localStorage.removeItem('session_id');
					window.location.pathname = '/';
				} else {
					console.log(error);
					reject(new APIError(url, error.response.data.error));
				}
			});
	});
}

export function makeAPIDeleteCall(url: string) {
	return new Promise<AxiosResponse>((resolve, reject) => {
		axios
			.delete(url, {
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

export async function deleteCluster(id: string): Promise<void> {
	await makeAPIDeleteCall('/api/clusters/' + id);
}

export async function getSuggestedSpaces(): Promise<SpaceSession[]> {
	let result = await makeAPIGetCall('/api/spaces/suggested');
	return result.data.data;
}

export async function getDiscoverableClusters(): Promise<Cluster[]> {
	let result = await makeAPIGetCall('/api/clusters/discoverable');
	return result.data.data;
}

export async function getMyClusters(): Promise<Cluster[]> {
	let result = await makeAPIGetCall('/api/users/@me/clusters');
	return result.data.data;
}

export async function createCluster(name: string, visibility: ClusterVisibility): Promise<string> {
	let result = await makeAPIPostCall('/api/clusters', { name, visibility });
	return result.data.data.cluster_id;
}

export async function createSpaceSessionInCluster(clusterId: string, topic: string): Promise<string> {
	let result = await makeAPIPostCall('/api/clusters/' + clusterId + '/spaces', { topic });
	return result.data.data.space_id;
}

export async function createSpaceSession(topic: string, visibility: SpaceSessionVisibility): Promise<string> {
	let result = await makeAPIPostCall('/api/spaces/', { topic, visibility });
	return result.data.data.space_id;
}

export async function joinCluster(clusterID: string): Promise<void> {
	await makeAPIPostCall('/api/clusters/' + clusterID + '/join');
}

export async function getCluster(id: string): Promise<Cluster> {
	let result = await makeAPIGetCall('/api/clusters/' + id);
	return result.data.data;
}

export async function getMe(): Promise<User> {
	let result = await makeAPIGetCall('/api/users/@me');
	return result.data.data;
}

export async function getSpaceSession(spaceID: string): Promise<SpaceSession> {
	let result = await makeAPIGetCall('/api/spaces/' + spaceID);
	return result.data.data;
}

export async function getSpaceSessionsInCluster(id: string): Promise<SpaceSession[]> {
	let result = await makeAPIGetCall('/api/clusters/' + id + '/spaces');
	return result.data.data;
}

export async function startSpaceSessionNoCluster(topic: string, visibility: SpaceSessionVisibility): Promise<string> {
	let result = await makeAPIPostCall('/api/spaces', { topic, visibility });
	return result.data.data.space_id;
}

export async function sendFriendRequest(user_id: string) {
	await makeAPIPostCall('/api/friends/send_request', { user_id });
}

export async function getFriendsList(
	after?: string
): Promise<{
	data: PublicUserInfo[];
	paging: { after: string };
}> {
	const result = await makeAPIGetCall('/api/users/@me/friends', { after });
	const { data, paging } = result.data;
	return { data, paging };
}

export async function getIncomingFriendRequests() {
	let result = await makeAPIPostCall('/api/friends/incoming_requests');
	return result.data.data;
}

export async function getOutgoingFriendRequests() {
	let result = await makeAPIPostCall('/api/friends/outgoing_requests');
	return result.data.data;
}

export async function acceptFriendRequest(user_id: string) {
	let result = await makeAPIPostCall('/api/friends/accept_request', { user_id });
	return result.data.data;
}

export async function denyFriendRequest(user_id: string) {
	let result = await makeAPIPostCall('/api/friends/deny_request', { user_id });
	return result.data.data;
}

export async function cancelFriendRequest(user_id: string) {
	let result = await makeAPIPostCall('/api/friends/cancel_request', { user_id });
	return result.data.data;
}

export async function block(user_id: string) {
	let result = await makeAPIPostCall('/api/friends/block', { user_id });
	return result.data.data;
}

export async function getSuggestedFriends(search: string = ''): Promise<PublicUserInfo[]> {
	let result = await makeAPIGetCall('/api/friends/suggested', { search });
	return result.data.data;
}
