import { createContext } from 'react';
import { ISpaceParticipant } from '../../typings/SpaceParticipant';

export type ISpaceContext = {
	participants: { [participantId: string]: ISpaceParticipant };
};

const SpaceContext = createContext<ISpaceContext>({
	participants: {}
});

export default SpaceContext;
