import React from 'react';
import { getGoogleAuthorizationUrl, getIonAuthorizationUrl } from '../../lib/getAuthorizationUrl';
import Box from '../Box/Box';

export default function LoginForm() {
	return (
		<Box>
			<h1>Log In</h1>
			<h2>
				<a href={getGoogleAuthorizationUrl()}>Google</a>
			</h2>
			<h2>
				<a href={getIonAuthorizationUrl()}>Ion</a>
			</h2>
			<span className="font-size-sm color-light-1">
				By logging in, you agree to the{' '}
				<a href="/terms" className="underline">
					terms
				</a>
			</span>
		</Box>
	);
}
