import {createContext} from 'react';
import {SpaceMessage} from '../../typings/Space';

const SpaceMessagesContext = createContext<SpaceMessage[]>([]);

export default SpaceMessagesContext;
