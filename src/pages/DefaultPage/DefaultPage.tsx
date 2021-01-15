import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';

export default function DefaultPage() {
	if (localStorage.getItem('session_id') == null) {
		return <LoginPage />;
	} else {
		return <HomePage />;
	}
}
