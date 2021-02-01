import { useParams } from 'react-router-dom';
import Space from '../../components/Space/Space';

export default function SpacePage() {
	const { spaceId } = useParams<{ spaceId: string }>();

	return <Space id={spaceId} />;
}
