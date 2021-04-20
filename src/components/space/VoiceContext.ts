/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {createContext} from 'react';
import {VoiceState} from './VoiceState';

const SpaceVoiceContext = createContext<VoiceState>(new VoiceState());

export default SpaceVoiceContext;
