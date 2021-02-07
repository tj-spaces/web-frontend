import { useContext } from 'react';
import AuthContext from '../components/AuthContext';
import SpaceParticipantsContext from '../components/Space/SpaceParticipantsContext';
import { SpaceParticipant } from '../typings/SpaceParticipant';

export default function useSpaceLocalParticipant(): SpaceParticipant | null {
	const { user } = useContext(AuthContext);
	const participants = useContext(SpaceParticipantsContext);

	if (user == null) {
		return null;
	}

	return participants[user.id] ?? null;
}
