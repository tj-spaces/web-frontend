import {createContext} from 'react';
import SpaceManager from './SpaceManager';

const SpaceManagerContext = createContext<SpaceManager | null>(null);

export default SpaceManagerContext;
