import { Link, Redirect, useLocation, useParams } from 'react-router-dom';
import { createSession } from '../../api/api';
import * as qs from 'query-string';
import { useContext, useEffect, useState } from 'react';
import Fullscreen from '../../components/Base/BaseFullscreen';
import AuthContext from '../../components/AuthContext';

export function AuthorizationCallback() {
	document.title = 'Logging In';

	const { provider } = useParams<{ provider: string }>();
	const { code } = qs.parse(useLocation().search);
	const { refreshAuthState } = useContext(AuthContext);
	const [state, setState] = useState<'loading' | 'error' | 'loaded'>('loading');

	useEffect(() => {
		if (typeof code !== 'string') {
			setState('error');
		} else {
			createSession(code, provider)
				.then((sessionId) => {
					localStorage.setItem('session_id', sessionId);
					refreshAuthState?.();
					setState('loaded');
				})
				.catch((err) => setState('error'));
		}
	}, [code, provider, refreshAuthState]);

	const LoginError = () => (
		<div>
			<h1>Login Error</h1>
			Something happened during the log in. <Link to="/login">Try again?</Link>
		</div>
	);

	const Loading = () => (
		<div>
			<h1>Loading</h1>
		</div>
	);

	switch (state) {
		case 'loading':
			return <Loading />;
		case 'loaded': {
			return <Redirect to="/" />;
		}
		case 'error':
			return <LoginError />;
	}
}

export default function AuthorizationCallbackPage() {
	return (
		<Fullscreen>
			<AuthorizationCallback />
		</Fullscreen>
	);
}
