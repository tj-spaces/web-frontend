/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {createContext} from 'react';
import ChatSDK from './chat/ChatSDK';
import SimulationServerSDK from './SimulationServerSDK';
import SimulationServerState from './SimulationServerState';

const SimulationServerContext = createContext<{
	simulationState: SimulationServerState;
	simulationSDK: SimulationServerSDK;
}>({
	simulationSDK: new SimulationServerSDK(new ChatSDK()),
	simulationState: new SimulationServerState(),
});

export default SimulationServerContext;
