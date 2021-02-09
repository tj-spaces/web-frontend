import {createContext} from 'react';
import {SpaceSession} from '../../typings/Space';

const ClusterIDContext = createContext<{
	id: string | null;
	spaces: SpaceSession[];
}>({id: null, spaces: []});

export default ClusterIDContext;
