import { createContext } from 'react';
import { SpacePositionInfo } from '../../typings/SpaceParticipant';

const SpacePositionContext = createContext<SpacePositionInfo | null>(null);

export default SpacePositionContext;
