import { PublicUserInfo } from './PublicUserInfo';

export type SpaceSessionVisibility = 'discoverable' | 'unlisted' | 'secret';

export interface SpaceSession {
	id: string;
	topic: string;
	start_time: string;
	stop_time: string;
	cluster_id?: string;
	host_id: string;
	host: PublicUserInfo;
	visibility: SpaceSessionVisibility;
	online_count: number;
}
