/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {PublicUserInfo} from './PublicUserInfo';

export interface FriendWithRecentActivity extends PublicUserInfo {
	last_active_time: string;
}

export type WorldType = '3d-voxel' | '2d-pixel';

export interface ITopicTag {
	id: string;
	display: string;
}
