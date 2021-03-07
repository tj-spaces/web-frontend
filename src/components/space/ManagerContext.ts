import {createContext} from 'react';
import SpaceManager from './Manager';

const SpaceManagerContext = createContext<SpaceManager>(null!);

export default SpaceManagerContext;
