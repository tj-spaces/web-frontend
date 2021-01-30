import Fullscreen from '../../components/Fullscreen/Fullscreen';
import LoginForm from '../../components/LoginForm/LoginForm';
import BaseText from '../../components/BaseText/BaseText';

export default function LoginPage() {
	return (
		<Fullscreen>
			<BaseText fontSize="xxl">Spaces</BaseText>
			<LoginForm />
		</Fullscreen>
	);
}
