import Fullscreen from '../../components/Fullscreen/Fullscreen';
import LoginForm from '../../components/LoginForm/LoginForm';
import Typography from '../../components/BaseText/BaseText';

export default function LoginPage() {
	return (
		<Fullscreen>
			<Typography fontSize="xxl">Spaces</Typography>
			<LoginForm />
		</Fullscreen>
	);
}
