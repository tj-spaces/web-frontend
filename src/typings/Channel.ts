export type IChannel = {
	id: number;
	name: string;
	color: string;
} & (
	| {
			type: 'direct';
			user_a_id: number;
			user_b_id: number;
	  }
	| {
			type: 'group';
			group_id: number;
	  }
	| {
			type: 'space';
			space_id: number;
	  }
);
