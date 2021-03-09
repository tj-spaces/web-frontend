/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {createContext} from 'react';
import {Cluster} from '../../typings/Cluster';

const CurrentClusterContext = createContext<Cluster | null>(null);

export default CurrentClusterContext;
