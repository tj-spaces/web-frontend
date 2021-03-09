/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {createContext} from 'react';
import {User} from '../typings/User';

export type AuthState = {
	isLoggedIn: boolean | null;
	user: User | null;

	/**
	 * Function that can be used to trigger an auth state refresh.
	 */
	refreshAuthState: (() => void) | null;
};

const AuthContext = createContext<AuthState>({
	isLoggedIn: false,
	user: null,
	refreshAuthState: null,
});

export default AuthContext;
