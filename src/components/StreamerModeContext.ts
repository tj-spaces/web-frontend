import {createContext} from 'react';

/**
 * A context that hides sensitive data if the user is in Streamer Mode (like Discord)
 */
const StreamerModeContext = createContext<boolean>(false);

export default StreamerModeContext;
