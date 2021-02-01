import { useContext } from 'react';
import SpaceContext from '../components/Space/SpaceContext';

export default function useSpaceParticipants() {
	const { participants } = useContext(SpaceContext);

	return participants;
}
