import { Link, Redirect, useLocation, useParams } from 'react-router-dom';
import { createSession } from '../../api/api';
import * as qs from 'query-string';
import React, { useEffect } from 'react';
import Box from '../../components/Box/Box';
import Fullscreen from '../../components/Fullscreen/Fullscreen';

export function AuthorizationCallback() {
	document.title = 'Logging In';

	const { provider } = useParams<{ provider: string }>();
	const { code } = qs.parse(useLocation().search);
	const [state, setState] = React.useState<'loading' | 'error' | 'loaded'>('loading');

	useEffect(() => {
		if (typeof code !== 'string') {
			setState('error');
		} else {
			createSession(code, provider)
				.then((sessionId) => {
					localStorage.setItem('session_id', sessionId);
					setState('loaded');
				})
				.catch((err) => setState('error'));
		}
	}, [code, provider]);

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

	console.log('Rendered');

	switch (state) {
		case 'loading':
			return <Loading />;
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
