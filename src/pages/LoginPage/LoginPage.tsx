import Fullscreen from '../../components/Base/BaseFullscreen';
import LoginForm from './LoginForm';
import BaseText from '../../components/Base/BaseText';

export default function LoginPage() {
	return (
		<Fullscreen>
			<BaseText fontSize="xxl">Spaces</BaseText>
			<LoginForm />
		</Fullscreen>
	);
}
