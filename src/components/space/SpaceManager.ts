import {Room} from 'twilio-video';
import {
	ChunkData,
	ChunkPosition,
	DisplayStatus,
	SpaceMetadata,
	SpaceParticipant,
} from '../../typings/Space';
import PixelSpaceRenderer from './PixelSpaceRenderer';
import SpaceChatEngine from './SpaceChatEngine';
import SpaceMediaEngine from './SpaceMediaEngine';

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

	renderer: PixelSpaceRenderer | null = null;
	chatEngine: SpaceChatEngine;
	mediaEngine: SpaceMediaEngine;

	setWebsocket(connection: WebSocket) {
		this.connection = connection;
		this.connected = true;

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
			this.connected = false;
		});

		if (this.outboundMessageQueue) {
			this.sendQueuedMessages();
		}
	}

	setRoom(room: Room) {
		this.mediaEngine.setTwilioRoom(room);
	}

	/**
	 * NOTE: this resizes the canvas to fit to its parent element!
	 * @param canvas The canvas.
	 */
	setCanvas(canvas: HTMLCanvasElement) {
		this.renderer = new PixelSpaceRenderer(canvas, this);
		this.renderer.render();
	}

	constructor(public readonly id: string) {
		this.chatEngine = new SpaceChatEngine(this);
		this.mediaEngine = new SpaceMediaEngine();
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

	private sendQueuedMessages() {
		let msg;
		while ((msg = this.outboundMessageQueue.shift()) != null) {
			this.send(msg[0], msg[1]);
		}
	}

	send(event: string, data: any) {
		if (this.connection && this.connected) {
			this.connection.send(event + ':' + JSON.stringify(data));
		} else {
			this.outboundMessageQueue.push([event, data]);
		}
	}
}
