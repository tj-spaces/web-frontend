import {
	ChunkData,
	ChunkPosition,
	SpaceMetadata,
	SpaceParticipant,
} from '../../typings/Space';

/**
 * This manager class processes data about a cluster as it arrives.
 */
export default class SpaceManager {
	participants = new Map<string, SpaceParticipant>();
	constructedWorldData = new Map<ChunkPosition, ChunkData>();
	spaceMetadata: SpaceMetadata = {};
	constructor(public readonly connection: WebSocket) {
		this.connection.addEventListener('message', (message) => {
			console.log('WEBSOCKET MESSAGE:', message);
		});
	}
}
