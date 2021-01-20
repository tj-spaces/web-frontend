export type ClusterVisibility = 'public' | 'unlisted';

export interface ICluster {
	id: number;
	creator_id: number;
	name: string;
	created_at: string;
	updated_at: string;
	visibility: ClusterVisibility;
}
