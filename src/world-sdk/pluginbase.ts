type ActionPermissions = {
	ifInteracted: boolean;
	ifNearby: boolean;
	arbitrarily: boolean;
};

type UserMetadataPermissions = {
	anonymousID: boolean;
	userID: boolean;
	displayName: boolean;
	profilePhoto: boolean;
};

type WorldMetadataPermissions = {
	id: boolean;
	creatorUserID: boolean;
	creationTime: boolean;
};

export interface PluginPermissions {
	showModal: ActionPermissions;
	showTitle: ActionPermissions;
	sendPrivateMessage: ActionPermissions & {
		requireUserPermission: boolean;
	};
	sendPublicMessage: ActionPermissions;
	playSound: ActionPermissions;
	accessUserMetadata: UserMetadataPermissions;
	accessWorldMetadata: WorldMetadataPermissions;
}

type CallbackRemover = () => void;
type MessageCallback = (message: any) => void;
type CloseCallback = () => void;

export interface Bot {
	sendMessage(message: any): void;
	onMessage(callback: MessageCallback): CallbackRemover;
	onClose(callback: CloseCallback): CallbackRemover;
}

export type BotInitializer = (bot: Bot) => void;

export {};
