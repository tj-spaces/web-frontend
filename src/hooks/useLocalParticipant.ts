import {useContext} from 'react';
import AuthContext from '../components/AuthContext';
import SpaceParticipantsContext from '../components/space/SpaceParticipantsContext';
import {SpaceParticipant} from '../typings/SpaceParticipant';

export default function useLocalParticipant(): SpaceParticipant | null {
	const {user} = useContext(AuthContext);
	const participants = useContext(SpaceParticipantsContext);

	return user ? participants[user.id] ?? null : null;
}
