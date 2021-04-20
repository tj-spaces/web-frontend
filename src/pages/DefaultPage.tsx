/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useIsLoggedIn} from '../components/AuthHooks';
import HomePage from './HomePage';
import LoginPage from './LoginPage';

/**
 * This is the root page. If you aren't logged in, it renders the login page,
 * and if you are logged in, it renders the homepage.
 */
export default function DefaultPage() {
	const loggedIn = useIsLoggedIn();
	if (!loggedIn) {
		return <LoginPage />;
	} else {
		return <HomePage />;
	}
}
