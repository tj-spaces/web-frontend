import { createContext } from 'react';

const CurrentSpaceContext = createContext<string | null>(null);

export default CurrentSpaceContext;
