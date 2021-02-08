import React from 'react';
import {Link} from 'react-router-dom';
import Fullscreen from '../../components/Base/BaseFullscreen';
import BaseRow from '../../components/Base/BaseRow';
import BaseText from '../../components/Base/BaseText';
import {
	getGoogleAuthorizationUrl,
	getIonAuthorizationUrl,
} from '../../lib/getAuthorizationUrl';

export default function LoginPage() {
	document.title = 'Log In';

	return (
		<Fullscreen>
			<BaseText variant="primary-title">Spaces</BaseText>
			<BaseRow direction="column" alignment="center">
				<BaseText variant="secondary-title">Log In</BaseText>
				<BaseText variant="body">
					<a href={getGoogleAuthorizationUrl()}>Google</a>
				</BaseText>
				<BaseText variant="body">
					<a href={getIonAuthorizationUrl()}>Ion</a>
				</BaseText>
				<BaseText variant="body">
					By logging in, you agree to the{' '}
					<Link to="/terms" className="underline">
						<b>terms</b>
					</Link>
				</BaseText>
			</BaseRow>
		</Fullscreen>
	);
}
