import React from 'react';
import { Link } from 'react-router-dom';
import { getGoogleAuthorizationUrl, getIonAuthorizationUrl } from '../../lib/getAuthorizationUrl';
import BaseRow from '../../components/Base/BaseRow';
import BaseText from '../../components/Base/BaseText';

export default function LoginForm() {
	return (
		<BaseRow direction="column" alignment="center">
			<BaseText fontSize="xl" fontWeight="bold">
				Log In
			</BaseText>
			<BaseText fontSize="large">
				<a href={getGoogleAuthorizationUrl()}>Google</a>
			</BaseText>
			<BaseText fontSize="large">
				<a href={getIonAuthorizationUrl()}>Ion</a>
			</BaseText>
			<BaseText fontSize="medium">
				By logging in, you agree to the{' '}
				<Link to="/terms" className="underline">
					<b>terms</b>
				</Link>
			</BaseText>
		</BaseRow>
	);
}
