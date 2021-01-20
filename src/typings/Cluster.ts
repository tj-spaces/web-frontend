export type ClusterVisibility = 'public' | 'unlisted';

export interface ICluster {
	id: string;
	creator_id: string;
	name: string;
	created_at: string;
	updated_at: string;
	visibility: ClusterVisibility;
}
