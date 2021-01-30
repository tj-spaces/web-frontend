import { createContext } from 'react';
import { IUser } from '../../typings/User';

export type AuthState = {
	isLoggedIn: boolean | null;
	user: IUser | null;

	/**
	 * Function that can be used to trigger an auth state refresh.
	 */
	refreshAuthState: (() => void) | null;
};

const AuthContext = createContext<AuthState>({ isLoggedIn: false, user: null, refreshAuthState: null });

export default AuthContext;
