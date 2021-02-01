import { useContext } from 'react';
import AuthContext from '../components/AuthContext';
import SpaceContext from '../components/Space/SpaceContext';
import { ISpaceParticipant } from '../typings/SpaceParticipant';

export default function useSpaceLocalParticipant(): ISpaceParticipant | null {
	const { user } = useContext(AuthContext);
	const spaceContext = useContext(SpaceContext);

	if (user == null) {
		return null;
	}

	return spaceContext.participants[user.id] ?? null;
}
