import {PublicUserInfo} from './PublicUserInfo';

export interface FriendWithRecentActivity extends PublicUserInfo {
	last_active_time: string;
}

export type WorldType = '3d-voxel' | '2d-pixel';
