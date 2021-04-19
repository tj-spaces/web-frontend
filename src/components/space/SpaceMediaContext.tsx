import {createContext} from 'react';
import SpaceMediaState from './SpaceMediaState';

const SpaceMediaContext = createContext<SpaceMediaState>(new SpaceMediaState());

export default SpaceMediaContext;
