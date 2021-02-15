import {PublicUserInfo} from './PublicUserInfo';

export interface FriendWithRecentActivity extends PublicUserInfo {
	last_active_time: string;
}
