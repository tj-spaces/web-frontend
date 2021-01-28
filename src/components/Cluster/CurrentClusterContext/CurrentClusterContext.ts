import { createContext } from 'react';
import { ISpace } from '../../../typings/Space';

const CurrentClusterContext = createContext<{ id: string | null; spaces: ISpace[] }>({ id: null, spaces: [] });

export default CurrentClusterContext;
