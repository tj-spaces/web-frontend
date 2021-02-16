import {PublicUserInfo} from '../typings/PublicUserInfo';
import {makeAPIPostCall, makeAPIGetCall} from './utils';

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
