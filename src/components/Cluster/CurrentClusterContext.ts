import { createContext } from 'react';
import { ISpace } from '../../typings/Space';

const ClusterIDContext = createContext<{ id: string | null; spaces: ISpace[] }>({ id: null, spaces: [] });

export default ClusterIDContext;
