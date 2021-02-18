import { Redirect } from 'react-router-dom';

export default function Logout() {
	localStorage.removeItem('session_id');
	return <Redirect to="/" />;
}
