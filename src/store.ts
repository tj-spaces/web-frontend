export interface MessageState {
	senderId: string;
	content: string;
}

export interface ChannelState {
	id: number;
	isUnread: boolean;
	messages: MessageState[];
}

export interface ChannelsState {
	activeChannelId: number;
	byId: {
		[channelId: number]: ChannelState;
	};
}

export interface UserState {
	account: {
		name: string;
		picture: string;
		id: number;
	};
	session: {
		lastRefreshTime: number;
		accessToken: string;
	};
}

export interface SpaceState {
	activeMembers: number;
	channels: ChannelsState;
	id: number;
	name: string;
	picture: string;
}

export interface SpacesState {
	activeSpaceId: number;
	byId: {
		[spaceId: number]: SpaceState;
	};
}

export interface State {
	channels: ChannelsState;
	spaces: SpacesState;
	user: UserState;
}
