import { useContext } from 'react';
import AuthContext from '../components/AuthContext';
import SpaceContext from '../components/Space/SpaceContext';
import { ISpaceParticipant } from '../typings/SpaceParticipant';

export default function useLocalParticipant(): ISpaceParticipant | null {
	const { user } = useContext(AuthContext);
	const spaceContext = useContext(SpaceContext);

	if (user == null) {
		return null;
	}

	if (spaceContext == null) {
		return null;
	}

	return spaceContext.participants[user.id] ?? null;
}
