import { useEffect, useState } from 'react';
import { getMe } from '../../api/api';
import AuthContext, { AuthState } from '../AuthContext/AuthContext';

export default function AuthContextManager({ children }: { children: React.ReactNode }) {
	const sessionId = localStorage.getItem('session_id');
	// Prevent race conditions
	const [authState, setAuthState] = useState<AuthState>({ isLoggedIn: null });

	useEffect(() => {
		if (sessionId) {
			getMe()
				.then((user) => {
					setAuthState({ isLoggedIn: true, user });
				})
				.catch(() => {
					setAuthState({ isLoggedIn: false });
				});
		} else {
			setAuthState({ isLoggedIn: false });
		}
	}, [sessionId]);

	if (authState?.isLoggedIn == null) {
		return null;
	} else {
		return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
	}
}
