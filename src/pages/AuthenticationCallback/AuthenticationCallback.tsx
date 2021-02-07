import {Link, Redirect, useLocation, useParams} from 'react-router-dom';
import {createSession} from '../../api/api';
import * as qs from 'query-string';
import {useContext, useEffect, useState} from 'react';
import Fullscreen from '../../components/Base/BaseFullscreen';
import AuthContext from '../../components/AuthContext';
import CenteredLoadingText from '../../components/CenteredLoadingText';

const LoginError = () => (
	<Fullscreen>
		<h1>Login Error</h1>
		Something happened during the log in. <Link to="/login">Try again?</Link>
	</Fullscreen>
);

/**
 * This is the handler for an OAuth callback. Its primary purpose is not to render anything,
 * but instead it's meant to handle client-side authentication code to register a server-side
 * session. It refreshes the auth state as well.
 *
 * This receives a URL param for which provider sent the OAuth code. Was it Google, Ion, etc?
 * This is important because this will be sent to the server to get an access token from these services
 * based on the code.
 * This also receives a query param for the code received from the OAuth provider (?code=...). This
 * is parsed by the query-string library. If no code is received, this callback returns an error.
 * Otherwise, it calls the createSession() method of the API.
 */
export function AuthorizationCallback() {
	document.title = 'Logging in';

	const {provider} = useParams<{provider: string}>();
	const {code} = qs.parse(useLocation().search);
	const {refreshAuthState} = useContext(AuthContext);
	const [state, setState] = useState<'loading' | 'error' | 'loaded'>('loading');

	useEffect(() => {
		if (typeof code !== 'string') {
			setState('error');
		} else {
			createSession(code, provider).then((sessionId) => {
				localStorage.setItem('session_id', sessionId);
				refreshAuthState?.();
				setState('loaded');
			});
		}
	}, [code, provider, refreshAuthState]);

	switch (state) {
		case 'loading':
			return <CenteredLoadingText />;
		case 'loaded':
			return <Redirect to="/" />;
		case 'error':
			return <LoginError />;
	}
}

/**
 * Wrapper page for the Authorization Callback
 */
export default function AuthorizationCallbackPage() {
	return (
		<Fullscreen>
			<AuthorizationCallback />
		</Fullscreen>
	);
}
