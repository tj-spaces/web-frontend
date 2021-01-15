import { Link, Redirect, useLocation, useParams } from 'react-router-dom';
import { getSessionId } from '../../api/api';
import * as qs from 'query-string';
import React from 'react';
import Box from '../../components/Box/Box';
import Fullscreen from '../../components/Fullscreen/Fullscreen';

export function AuthorizationCallback() {
	const { provider } = useParams<{ provider: string }>();
	const { code } = qs.parse(useLocation().search);
	const [state, setState] = React.useState<'loading' | 'error' | 'loaded'>('loading');

	const LoginError = () => (
		<Box>
			<h1>Login Error</h1>
			Something happened during the log in. <Link to="/login">Try again?</Link>
		</Box>
	);

	const Loading = () => (
		<Box>
			<h1>Loading</h1>
		</Box>
	);

	switch (state) {
		case 'loading':
			if (typeof code !== 'string') {
				setState('error');
				return <LoginError />;
			} else {
				getSessionId(code, provider)
					.then((sessionId) => {
						localStorage.setItem('session_id', sessionId);
						setState('loaded');
					})
					.catch((err) => setState('error'));
				return <Loading />;
			}
		case 'loaded':
			return <Redirect to="/" />;
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
