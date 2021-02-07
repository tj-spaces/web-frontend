import { createContext } from 'react';
import { SpaceParticipant } from '../../typings/SpaceParticipant';

const SpaceParticipantsContext = createContext<Record<string, SpaceParticipant>>({});

export default SpaceParticipantsContext;
