import {useContext} from 'react';
import AuthContext from '../components/AuthContext';
import HomePage from './HomePage';
import LoginPage from './LoginPage';

/**
 * This is the root page. If you aren't logged in, it renders the login page,
 * and if you are logged in, it renders the homepage.
 */
export default function DefaultPage() {
	const auth = useContext(AuthContext);
	if (!auth.isLoggedIn) {
		return <LoginPage />;
	} else {
		return <HomePage />;
	}
}