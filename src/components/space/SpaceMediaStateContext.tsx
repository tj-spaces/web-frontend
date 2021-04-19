import {createContext} from 'react';
import SpaceMediaState from './SpaceMediaState';

const SpaceMediaStateContext = createContext<SpaceMediaState>(
	new SpaceMediaState()
);

export default SpaceMediaStateContext;
