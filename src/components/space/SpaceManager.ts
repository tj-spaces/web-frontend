import {
	ChunkData,
	ChunkPosition,
	DisplayStatus,
	SpaceMetadata,
	SpaceParticipant,
} from '../../typings/Space';
import SpaceChatEngine from './SpaceChatEngine';

/**
 * This manager class processes data about a cluster as it arrives.
 */
export default class SpaceManager {
	participants = new Map<string, SpaceParticipant>();

	constructedWorldData = new Map<ChunkPosition, ChunkData>();
	spaceMetadata: SpaceMetadata = {};

	private outboundMessageQueue: [string, any][] = [];

	private connection: WebSocket | null = null;
	private connected: boolean = false;
	chatEngine: SpaceChatEngine;

	setWebsocket(connection: WebSocket) {
		this.connection = connection;
		this.connected = false;

		this.connection.addEventListener(
			'message',
			(message: MessageEvent<string>) => {
				let colonIndex = message.data.indexOf(':');
				let type =
					colonIndex > -1 ? message.data.slice(0, colonIndex) : message.data;
				let payload = colonIndex > -1 ? message.data.slice(colonIndex + 1) : '';

				console.log({data: message.data, type, payload});
			}
		);

		this.connection.addEventListener('close', () => {
			// What to do if the connection closes?
			this.connected = true;
		});
	}

	constructor() {
		this.chatEngine = new SpaceChatEngine(this);
	}

	setStatus(status: DisplayStatus) {
		this.send('display-status', status);
	}

	setMoveDirection(direction: {x: 0 | 1 | -1; y: 0 | 1 | -1; z: 0 | 1 | -1}) {
		this.send('move', direction);
	}

	stopMoving() {
		this.setMoveDirection({x: 0, y: 0, z: 0});
	}

	// eslint-disable-next-line
	private sendQueuedMessages() {
		let msg;
		while ((msg = this.outboundMessageQueue.shift()) != null) {
			this.send(msg[0], msg[1]);
		}
	}

	send(event: string, data: any) {
		if (this.connection) {
			this.connection.send(event + ':' + JSON.stringify(data));
		} else {
			this.outboundMessageQueue.push([event, data]);
		}
	}
}
