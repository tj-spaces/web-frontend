import {Store, useStoredValue} from '../store/store';
import {PublicUserInfo} from '../typings/PublicUserInfo';

import {getPublicUser} from './api';
export {getPublicUser};

const store = new Store<PublicUserInfo>((id: string) => getPublicUser(id));

export function usePublicUser(id: string) {
	return useStoredValue(store, id);
}
