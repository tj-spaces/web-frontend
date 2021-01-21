import { createContext } from 'react';

/**
 * Context containing the ID of the currently-selected space.
 */
const CurrentSpaceContext = createContext<string | null>(null);

export default CurrentSpaceContext;
