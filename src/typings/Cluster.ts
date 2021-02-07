export type ClusterVisibility = 'discoverable' | 'unlisted' | 'secret';

export interface Cluster {
	id: string;
	creator_id: string;
	name: string;
	created_at: string;
	updated_at: string;
	visibility: ClusterVisibility;
	last_activity: string;
}
