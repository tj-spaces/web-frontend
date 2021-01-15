export type SpaceVisibility = 'public' | 'unlisted';

export interface ISpace {
	id: number;
	creator_id: number;
	name: string;
	created_at: string;
	updated_at: string;
	visibility: SpaceVisibility;
}
