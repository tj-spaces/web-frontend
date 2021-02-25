import {WorldType} from './Types';

export type SpaceVisibility = 'discoverable' | 'unlisted' | 'secret';

export interface Space {
	id: string;
	creator_id?: string;
	cluster_id?: string;
	name: string;
	description: string;
	visibility: SpaceVisibility;
	allows_templating: boolean;
	download_count: number;
	world_type: WorldType;
}

export interface SpaceMessage {
	/** Unique ID for this SpaceMessage */
	id: number;
	/** The ID of the message sender */
	sender_id: string;
	/** Message text */
	content: string;
	/** The message this message is replying to. If not present, it isn't replying to anything. */
	reply_to_id?: string;
	/**
	 * This is an easy way to see all the messages that have replied to this SpaceMessage.
	 * This is not provided to us by the server. We must construct it based on the other messages we get.
	 */
	replies?: SpaceMessage[];
}

/**
 * Where the user is in the space.
 * This is a 2D location, because as of now, the spaces are "2.5-dimensional" worlds
 */
export interface SpaceLocation {
	x: number;
	y: number;
	z: number;
}

export interface SpacePositionInfo {
	/**
	 * Where the user is in the space.
	 * This is a 2D location, because as of now, the spaces are "2.5-dimensional" worlds
	 */
	location: SpaceLocation;

	/**
	 * The 2D rotation of the user
	 */
	rotation: number;
}

export type DisplayStatus =
	| 'agree'
	| 'disagree'
	| 'faster'
	| 'slower'
	| 'raised-hand'
	| 'none'
	| 'laughing';

/**
 * An Participant in a space is anybody in the space that is either a guest or a user with an account.
 * This is not the same as an Account, which holds necessary information such as a user's email, username,
 * birthday, and etc.
 */
export interface SpaceParticipant {
	/**
	 * An ID assigned to somebody when they join the Space
	 * If a user joins as a guest from the browser, this ID stays with them even if they
	 * join different spaces. If a user joins as a registered user, this is just their account id.
	 */
	accountID: string;

	/**
	 * Nickname to display for the user
	 */
	displayName: string;

	/**
	 * Color of the user's avatar
	 */
	displayColor:
		| 'red'
		| 'orange'
		| 'yellow'
		| 'green'
		| 'blue'
		| 'violet'
		| 'pink';

	/**
	 * Anything from 'agree' to 'disagree' to 'go faster'
	 */
	displayStatus: DisplayStatus;

	/**
	 * Whether the user has been granted permission to present
	 */
	canPresent: boolean;

	/**
	 * Whether the user is allowed to turn on their microphone
	 */
	canActivateMicrophone: boolean;

	/**
	 * Whether the user is allowed to turn on their camera
	 */
	canActivateCamera: boolean;

	/**
	 * Whether the user is an administrator
	 */
	isAdministrator: boolean;

	/**
	 * Whether the user is a moderator
	 */
	isModerator: boolean;

	/**
	 * Whether the user is currently presenting
	 */
	isPresenting: boolean;

	/**
	 * Info about this user's location
	 */
	position: SpacePositionInfo;

	/**
	 * The direction the participant is currently rotating
	 */
	rotatingDirection: 0 | 1 | -1;
	movingDirection: 0 | 1 | -1;
}

export interface SpaceMetadata {}

export interface ChunkPosition {
	x: number;
	y: number;
	z: number;
}

export interface Block {
	id: string;
}

export interface ChunkData {
	// X, Y, and Z position, divided by 16
	position: ChunkPosition;
	// A list of the unique blocks (with metadata) that occur in the world
	palette: Block[];
	// A list of palette indexes, returned as a stream of binary data
	blocks: Uint32Array;
}
