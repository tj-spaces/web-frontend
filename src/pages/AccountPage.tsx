/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useContext} from 'react';
import AuthContext from '../components/AuthContext';
import BaseRow from '../components/base/BaseRow';
import BaseText from '../components/base/BaseText';
import Navbar from '../components/Navbar';
import StreamerModeContext from '../components/StreamerModeContext';
import {createStylesheet} from '../styles/createStylesheet';

const styles = createStylesheet({
	picture: {
		flex: 1,
		borderRadius: '100%',
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: '100vw',
		height: '100vh',
	},
});

/**
 * A page where a user can configure their account, update their username, delete their account, etc.
 */
export default function AccountPage() {
	const {user} = useContext(AuthContext);
	const streamerMode = useContext(StreamerModeContext);
	if (user == null) {
		throw new Error('AuthContext should catch this');
	}
	return (
		<div className={styles('container')}>
			<Navbar />
			<BaseRow direction="column" alignment="center" spacing={1}>
				<BaseText variant="primary-title">My Account</BaseText>
				<BaseRow direction="row" alignment="center" spacing={1}>
					<img src={user.picture} alt="Me" className={styles('picture')}></img>
					<BaseText variant="secondary-title">{user.name}</BaseText>
				</BaseRow>
				<BaseRow direction="row" alignment="center" spacing={1}>
					<BaseText variant="list-item-title">Email</BaseText>
					<BaseText variant="list-item-title">
						{streamerMode ? '<hidden>' : user.email}
					</BaseText>
				</BaseRow>
				<BaseRow direction="row" alignment="center" spacing={1}>
					<BaseText variant="list-item-title">First name</BaseText>
					<BaseText variant="list-item-title">{user.given_name}</BaseText>
				</BaseRow>
				<BaseRow direction="row" alignment="center" spacing={1}>
					<BaseText variant="list-item-title">Last name</BaseText>
					<BaseText variant="list-item-title">{user.family_name}</BaseText>
				</BaseRow>
			</BaseRow>
		</div>
	);
}
