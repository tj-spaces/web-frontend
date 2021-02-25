import {useParams} from 'react-router-dom';
import SpaceWrapper from '../components/space/SpaceWrapper';

export default function SpacePage() {
	const {spaceId} = useParams<{spaceId: string}>();

	return <SpaceWrapper id={spaceId} />;
}
