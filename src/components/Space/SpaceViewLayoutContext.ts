import { createContext } from 'react';

const SpaceViewLayoutContext = createContext<{ expanded: boolean }>({ expanded: false });

export default SpaceViewLayoutContext;
