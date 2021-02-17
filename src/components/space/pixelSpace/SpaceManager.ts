import {SIM_SERVER_URL} from '../../../lib/constants';
import {SpaceParticipant} from '../../../typings/Space';

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

/**
 * This manager class processes data about a cluster as it arrives.
 */
export default class SpaceManager {
	socket: WebSocket;
	participants = new Map<string, SpaceParticipant>();
	constructedWorldData = new Map<ChunkPosition, ChunkData>();
	spaceMetadata: SpaceMetadata = {};
	constructor(public readonly id: string) {
		this.socket = new WebSocket(`${SIM_SERVER_URL}/space/${id}`);

		this.socket.addEventListener('message', (message) => {
			console.log(message);
		});
	}
}
