import {createContext} from 'react';

/**
 * Context containing the ID of the currently-selected space.
 */
const SpaceIDContext = createContext<string | null>(null);

export default SpaceIDContext;
