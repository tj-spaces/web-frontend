import { createContext } from 'react';

const SpaceConnectionContext = createContext<SocketIOClient.Socket | null>(null);

export default SpaceConnectionContext;
