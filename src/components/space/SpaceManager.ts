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
import Renderer from './spaceView3D/Renderer';
import SpaceChatEngine from './SpaceChatEngine';

const logger = getLogger('space');

export interface SpaceEvents {
	user_join: number;
	user_leave: number;
	message: number;
}

/**
 * This manager class processes data about a cluster as it arrives.
 */
export default class SpaceManager implements NodeJS.EventEmitter {
	participants = new Map<string, SpaceParticipant>();

	constructedWorldData = new Map<ChunkPosition, ChunkData>();
	spaceMetadata: SpaceMetadata = {};

	private outboundMessageQueue: [string, any][] = [];

	private connection: WebSocket | null = null;
	private connected: boolean = false;

	renderer: Renderer | null = null;
	chatEngine: SpaceChatEngine;

	private listeners_: {
		[key in keyof SpaceEvents]?: Set<(data: SpaceEvents[key]) => void>;
	} = {};

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

	/**
	 * NOTE: this resizes the canvas to fit to its parent element!
	 * @param canvas The canvas.
	 */
	setCanvas(canvas: HTMLCanvasElement | null) {
		if (canvas) {
			console.log('Creating new using', canvas);
			this.renderer = new Renderer(canvas, this);
			this.renderer.render();
		}
	}

	constructor(public readonly id: string) {
		this.chatEngine = new SpaceChatEngine(this);
	}

	addListener(
		event: keyof SpaceEvents,
		listener: (data: SpaceEvents[typeof event]) => void
	): this {
		if (!(event in this.listeners_)) {
			this.listeners_[event] = new Set();
		}
		this.listeners_[event]!.add(listener);
		throw new Error('Method not implemented.');
	}
	on(
		event: keyof SpaceEvents,
		listener: (data: SpaceEvents[typeof event]) => void
	): this {
		return this.addListener(event, listener);
	}
	once(
		event: keyof SpaceEvents,
		listener: (data: SpaceEvents[typeof event]) => void
	): this {
		const l = (data: SpaceEvents[typeof event]) => {
			listener(data);
			this.removeListener(event, l);
		};
		throw this.addListener(event, l);
	}
	removeListener(
		event: keyof SpaceEvents,
		listener: (data: SpaceEvents[typeof event]) => void
	): this {
		if (event in this.listeners_) {
			this.listeners_[event]?.delete(listener);
		}
		return this;
	}
	off(
		event: keyof SpaceEvents,
		listener: (data: SpaceEvents[typeof event]) => void
	): this {
		this.removeListener(event, listener);
		throw new Error('Method not implemented.');
	}
	removeAllListeners(event?: keyof SpaceEvents): this {
		if (event) {
			this.listeners_[event]?.clear();
		} else {
			// Memory leak? IDK
			this.listeners_ = {};
		}
		return this;
	}
	setMaxListeners(n: number): this {
		throw new Error('Method not implemented.');
	}
	getMaxListeners(): number {
		throw new Error('Method not implemented.');
	}
	listeners(event: keyof SpaceEvents): Function[] {
		if (event in this.listeners_) {
			return Array.from(this.listeners_[event]!);
		} else {
			return [];
		}
	}
	rawListeners(event: keyof SpaceEvents): Function[] {
		throw new Error('Method not implemented.');
	}
	emit(event: keyof SpaceEvents, data: SpaceEvents[typeof event]): boolean {
		if (event in this.listeners_) {
			this.listeners_[event]!.forEach((listener) => listener(data));
			return this.listeners_[event]!.size > 0;
		}
		return false;
	}
	listenerCount(event: keyof SpaceEvents): number {
		if (event in this.listeners_) {
			return this.listeners_[event]!.size;
		}
		return 0;
	}
	prependListener(
		event: string | symbol,
		listener: (...args: any[]) => void
	): this {
		throw new Error('Method not implemented.');
	}
	prependOnceListener(
		event: string | symbol,
		listener: (...args: any[]) => void
	): this {
		throw new Error('Method not implemented.');
	}
	eventNames(): (string | symbol)[] {
		throw new Error('Method not implemented.');
	}

	setStatus(status: DisplayStatus) {
		this.send('display-status', status);
	}

	setMoveDirection(direction: {x: 0 | 1 | -1; y: 0 | 1 | -1}) {
		this.send('move', direction);
	}

	stopMoving() {
		this.setMoveDirection({x: 0, y: 0});
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
	}
}
