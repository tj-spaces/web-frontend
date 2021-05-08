/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {createContext} from 'react';
import VoiceSDK from './VoiceSDK';
import VoiceState from './VoiceState';

export type VoiceContextProps = {
	voiceState: VoiceState;
	voiceSDK: VoiceSDK;
};

const VoiceContext = createContext<VoiceContextProps>({
	voiceState: new VoiceState(),
	voiceSDK: new VoiceSDK(),
});

export default VoiceContext;
