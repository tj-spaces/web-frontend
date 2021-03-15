/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {createContext} from 'react';
import SimulationServer from './SimulationServer';

const SimulationServerContext = createContext<SimulationServer>(null!);

export default SimulationServerContext;
