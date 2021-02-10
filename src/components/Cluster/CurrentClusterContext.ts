import {createContext} from 'react';
import {Cluster} from '../../typings/Cluster';

const CurrentClusterContext = createContext<Cluster | null>(null);

export default CurrentClusterContext;
