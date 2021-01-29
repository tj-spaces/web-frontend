import React from 'react';
import { getGoogleAuthorizationUrl, getIonAuthorizationUrl } from '../../lib/getAuthorizationUrl';

export default function LoginForm() {
	return (
		<div>
			<h1 className="text-center">Log In</h1>
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
		</div>
	);
}
