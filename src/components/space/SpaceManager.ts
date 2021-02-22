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
		this.connection.addEventListener(
			'message',
			(message: MessageEvent<string>) => {
				let colonIndex = message.data.indexOf(':');
				let type =
					colonIndex > -1 ? message.data.slice(0, colonIndex) : message.data;
				let payload = colonIndex > -1 ? message.data.slice(colonIndex + 1) : '';

				console.log('DATA:', message.data);

				console.log({type, payload});
			}
		);
	}
}
