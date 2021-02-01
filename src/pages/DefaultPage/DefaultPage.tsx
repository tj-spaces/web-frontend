import { useContext } from 'react';
import AuthContext from '../../components/AuthContext';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';

export default function DefaultPage() {
	const auth = useContext(AuthContext);
	if (!auth.isLoggedIn) {
		return <LoginPage />;
	} else {
		return <HomePage />;
	}
}
