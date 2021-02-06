export type SpaceSessionVisibility = 'discoverable' | 'unlisted' | 'secret';

export interface SpaceSession {
	id: string;
	name: string;
	start_time: string;
	stop_time: string;
	cluster_id?: string;
	host_id: string;
	visibility: SpaceSessionVisibility;
}
