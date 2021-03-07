import {createContext} from 'react';
import {VoiceServerCluster} from '../../mediautil/MediaConnector';

const SpaceVoiceContext = createContext<null | VoiceServerCluster>(null);

export default SpaceVoiceContext;
