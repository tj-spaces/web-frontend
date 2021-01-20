import { createContext } from 'react';

const CurrentClusterContext = createContext<string | null>(null);

export default CurrentClusterContext;
