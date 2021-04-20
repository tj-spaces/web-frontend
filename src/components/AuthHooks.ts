import {useContext} from 'react';
import AuthContext from './AuthContext';

export function useCurrentUser() {
	return useContext(AuthContext).user;
}

export function useCurrentUserID() {
	return useCurrentUser()?.id ?? null;
}

export function useIsLoggedIn() {
	return useContext(AuthContext).isLoggedIn;
}

export function useRefreshAuthState() {
	return useContext(AuthContext).refreshAuthState;
}
