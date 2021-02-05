export type ClusterVisibility = 'discoverable' | 'unlisted' | 'secret';

export interface ICluster {
	id: string;
	creator_id: string;
	name: string;
	created_at: string;
	updated_at: string;
	visibility: ClusterVisibility;
}
