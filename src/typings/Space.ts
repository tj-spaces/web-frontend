export type ISpace = {
	id: string;
	name: string;
	color: string;
} & (
	| {
			type: 'direct';
			user_a_id: string;
			user_b_id: string;
	  }
	| {
			type: 'group';
			group_id: string;
	  }
	| {
			type: 'cluster';
			cluster_id: string;
	  }
);
