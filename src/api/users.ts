/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {Store, useStoredValue} from '../store/store';
import {PublicUserInfo} from '../typings/PublicUserInfo';

import {getPublicUser} from './api';
export {getPublicUser};

const store = new Store<PublicUserInfo>((id: string) => getPublicUser(id));

export function usePublicUser(id: string) {
	return useStoredValue(store, id);
}
