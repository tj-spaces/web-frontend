import { useParams } from 'react-router-dom';
import Fullscreen from '../../components/Fullscreen/Fullscreen';

export default function SpacePage() {
	const { spaceId } = useParams<{ spaceId: string }>();

	return (
		<Fullscreen>
			<h1>Space #{spaceId}</h1>
		</Fullscreen>
	);
}
