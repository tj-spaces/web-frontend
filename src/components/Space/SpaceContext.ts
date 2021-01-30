import { createContext } from 'react';
import { ISpaceParticipant } from '../../typings/SpaceParticipant';

export type ISpaceContext = {
	participants: { [participantId: string]: ISpaceParticipant };
};

const SpaceContext = createContext<ISpaceContext | null>(null);

export default SpaceContext;
