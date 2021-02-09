import {createContext} from 'react';
import {SpaceParticipant} from '../../typings/Space';

const SpaceParticipantsContext = createContext<
	Record<string, SpaceParticipant>
>({});

export default SpaceParticipantsContext;
