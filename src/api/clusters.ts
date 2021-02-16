import {Store, useStoredValue} from '../store/store';
import {Cluster} from '../typings/Cluster';

import {getCluster} from './api';
export {getCluster};

const store = new Store<Cluster>((id: string) => getCluster(id));

export function useCluster(clusterID: string) {
	return useStoredValue(store, clusterID);
}
