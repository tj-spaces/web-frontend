import Fullscreen from '../../components/Fullscreen/Fullscreen';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function LoginPage() {
	return (
		<Fullscreen>
			<h1 style={{ fontSize: '4rem' }}>Spaces</h1>
			<LoginForm />
		</Fullscreen>
	);
}
