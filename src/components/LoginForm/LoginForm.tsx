import React from 'react';
import { Link } from 'react-router-dom';
import { getGoogleAuthorizationUrl, getIonAuthorizationUrl } from '../../lib/getAuthorizationUrl';
import BaseRow from '../BaseRow/BaseRow';
import Typography from '../BaseText/BaseText';

export default function LoginForm() {
	return (
		<BaseRow direction="column" alignment="center">
			<Typography fontSize="xl" fontWeight="bold">
				Log In
			</Typography>
			<Typography fontSize="large">
				<a href={getGoogleAuthorizationUrl()}>Google</a>
			</Typography>
			<Typography fontSize="large">
				<a href={getIonAuthorizationUrl()}>Ion</a>
			</Typography>
			<Typography fontSize="medium">
				By logging in, you agree to the{' '}
				<Link to="/terms" className="underline">
					<b>terms</b>
				</Link>
			</Typography>
		</BaseRow>
	);
}
