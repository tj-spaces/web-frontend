import {Room} from 'twilio-video';
import {getLogger} from '../../lib/ClusterLogger';
import {
	ChunkData,
	ChunkPosition,
	DisplayStatus,
	IChatHistoryEvent,
	IMessageEvent,
	IUserJoinEvent,
	IUserLeaveEvent,
	IUserMoveEvent,
	IUsersEvent,
	SpaceMetadata,
	SpaceParticipant,
} from '../../typings/Space';
import PixelSpaceRenderer from './spaceView3D/PixelSpaceRenderer';
import SpaceChatEngine from './SpaceChatEngine';
import SpaceMediaEngine from './SpaceMediaEngine';

const logger = getLogger('space');

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

	private handleWebsocketEvent(type: string, payload: string) {
		console.log({type, payload});
		let parsed_payload;
		switch (type) {
			case 'message':
				parsed_payload = JSON.parse(payload) as IMessageEvent;
				this.chatEngine.receivedMessage(parsed_payload);
				break;
			case 'chat_history':
				for (let msg of JSON.parse(payload) as IChatHistoryEvent) {
					this.chatEngine.receivedMessage(msg);
				}
				break;
			case 'users':
				parsed_payload = JSON.parse(payload) as IUsersEvent;
				for (let id in parsed_payload) {
					this.participants.set(id, parsed_payload[id]);
				}
				break;
			case 'user_join':
				parsed_payload = JSON.parse(payload) as IUserJoinEvent;
				this.participants.set(parsed_payload.id, parsed_payload);
				break;
			case 'user_leave':
				parsed_payload = JSON.parse(payload) as IUserLeaveEvent;
				this.participants.delete(parsed_payload);
				break;
			case 'user_move':
				parsed_payload = JSON.parse(payload) as IUserMoveEvent;
				this.participants.get(parsed_payload.id)!.position =
					parsed_payload.new_position;
				break;
		}
	}

	/**
	 * Adds primary event listeners to the Websocket
	 * @param connection The websocket connected to the Space
	 */
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

				this.handleWebsocketEvent(type, payload);
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
		logger.info('Setting room to ' + room);
		this.mediaEngine.setTwilioRoom(room);
	}

	/**
	 * NOTE: this resizes the canvas to fit to its parent element!
	 * @param canvas The canvas.
	 */
	setCanvas(canvas: HTMLCanvasElement | null) {
		if (canvas) {
			console.log('Creating new using', canvas);
			this.renderer = new PixelSpaceRenderer(canvas, this);
			this.renderer.render();
		}
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

	/**
	 * Allows us to temporarily hold messages when our connection breaks
	 */
	private sendQueuedMessages() {
		let msg;
		while ((msg = this.outboundMessageQueue.shift()) != null) {
			this.send(msg[0], msg[1]);
		}
	}

	/**
	 * Sends an event in a consistent format to the server.
	 * @param event The event type
	 * @param data Related data for the event, which is then JSONified.
	 */
	send(event: string, data: any) {
		if (this.connection && this.connected) {
			this.connection.send(event + ':' + JSON.stringify(data));
		} else {
			this.outboundMessageQueue.push([event, data]);
		}
	}

	/**
	 * Removes event listeners and etc
	 */
	destroy() {
		logger.info('Destroying connected components');
		this.mediaEngine.disconnect();
	}
}
