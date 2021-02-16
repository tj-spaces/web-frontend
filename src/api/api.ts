import axios from 'axios';
import {API_SERVER_URL} from '../lib/constants';
import {Cluster, ClusterVisibility} from '../typings/Cluster';
import {PublicUserInfo} from '../typings/PublicUserInfo';
import {Space, SpaceVisibility} from '../typings/Space';
import {User} from '../typings/User';
import {makeAPIDeleteCall, makeAPIGetCall, makeAPIPostCall} from './utils';
import {APIError} from './error';

axios.defaults.baseURL = API_SERVER_URL;

/**
 *
 * @param code The code sent by the OAuth provider
 * @param provider The provider that send the OAuth code
 */
export async function createSession(
	code: string,
	provider: string
): Promise<string> {
	const response = await axios.post('/auth/create_session', {
		code,
		provider,
	});

	if (response.status === 200) {
		return response.data.session_id;
	} else {
		throw new APIError('/auth/create_session', response.data.error);
	}
}

export async function deleteCluster(id: string): Promise<void> {
	await makeAPIDeleteCall('/api/clusters/' + id);
}

export async function getSuggestedSpaces(): Promise<Space[]> {
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

export async function createCluster(
	name: string,
	visibility: ClusterVisibility
): Promise<string> {
	let result = await makeAPIPostCall('/api/clusters', {name, visibility});
	return result.data.data.cluster_id;
}

export async function createSpaceSessionInCluster(
	name: string,
	description: string,
	visibility: SpaceVisibility,
	allowsTemplating: boolean,
	clusterID: string
): Promise<string> {
	let result = await makeAPIPostCall('/api/clusters/' + clusterID + '/spaces', {
		name,
		description,
		visibility,
		allowsTemplating,
	});
	return result.data.data.space_id;
}

export async function createSpaceSession(
	name: string,
	description: string,
	visibility: SpaceVisibility,
	allowsTemplating: boolean
): Promise<string> {
	let result = await makeAPIPostCall('/api/spaces', {
		name,
		description,
		visibility,
		allowsTemplating,
	});
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

export async function getPublicUser(id: string): Promise<PublicUserInfo> {
	let result = await makeAPIGetCall('/api/users/' + id);
	return result.data.data;
}

export async function getSpace(spaceID: string): Promise<Space> {
	let result = await makeAPIGetCall('/api/spaces/' + spaceID);
	return result.data.data;
}

export async function getSpaceSessionsInCluster(id: string): Promise<Space[]> {
	let result = await makeAPIGetCall('/api/clusters/' + id + '/spaces');
	return result.data.data;
}

export async function sendFriendRequest(user_id: string) {
	await makeAPIPostCall('/api/friends/send_request', {user_id});
}

export async function getFriendsList(
	after?: string
): Promise<{
	data: PublicUserInfo[];
	paging: {after: string};
}> {
	const result = await makeAPIGetCall('/api/users/@me/friends', {after});
	const {data, paging} = result.data;
	return {data, paging};
}

export async function getIncomingFriendRequests(): Promise<PublicUserInfo[]> {
	let result = await makeAPIGetCall('/api/friends/incoming_requests');
	return result.data.data;
}

export async function getOutgoingFriendRequests(): Promise<PublicUserInfo[]> {
	let result = await makeAPIGetCall('/api/friends/outgoing_requests');
	return result.data.data;
}

export async function acceptFriendRequest(user_id: string) {
	let result = await makeAPIPostCall('/api/friends/accept_request', {user_id});
	return result.data.data;
}

export async function denyFriendRequest(user_id: string) {
	let result = await makeAPIPostCall('/api/friends/deny_request', {user_id});
	return result.data.data;
}

export async function cancelFriendRequest(user_id: string) {
	let result = await makeAPIPostCall('/api/friends/cancel_request', {user_id});
	return result.data.data;
}

export async function block(user_id: string) {
	let result = await makeAPIPostCall('/api/friends/block', {user_id});
	return result.data.data;
}

export async function getSuggestedFriends(
	search: string = ''
): Promise<PublicUserInfo[]> {
	let result = await makeAPIGetCall('/api/friends/suggested', {search});
	return result.data.data;
}
