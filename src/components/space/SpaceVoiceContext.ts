import {createContext} from 'react';
import {VoiceServerLike} from '../../mediautil/MediaConnector';

const SpaceVoiceContext = createContext<null | VoiceServerLike>(null);

export default SpaceVoiceContext;
