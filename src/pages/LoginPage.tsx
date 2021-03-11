/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/

import {Link} from 'react-router-dom';
import Fullscreen from '../components/base/BaseFullscreen';
import BaseRow from '../components/base/BaseRow';
import BaseText from '../components/base/BaseText';
import {
	getGoogleAuthorizationUrl,
	getIonAuthorizationUrl,
} from '../lib/getAuthorizationUrl';

export default function LoginPage() {
	document.title = 'Log In | Nebula';

	return (
		<Fullscreen>
			<BaseText variant="primary-title">Nebula</BaseText>
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
