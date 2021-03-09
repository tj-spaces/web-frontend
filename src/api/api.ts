/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import axios from 'axios';
import {API_SERVER_URL} from '../lib/constants';
import {PublicUserInfo} from '../typings/PublicUserInfo';
import {User} from '../typings/User';
import {makeAPIGetCall} from './utils';
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

export async function getMe(): Promise<User> {
	let result = await makeAPIGetCall('/api/users/@me');
	return result.data.data;
}

export async function getPublicUser(id: string): Promise<PublicUserInfo> {
	let result = await makeAPIGetCall('/api/users/' + id);
	return result.data.data;
}
