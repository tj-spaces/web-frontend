import {getLogger} from '../../lib/ClusterLogger';
import {
	ChunkData,
	ChunkPosition,
	DisplayStatus,
	Position,
	SpaceMessage,
	SpaceMetadata,
	SpaceParticipant,
} from '../../typings/Space';
import Renderer from './spaceView3D/Renderer';
import SpaceChatEngine from './SpaceChatEngine';

const logger = getLogger('space');

export interface SpaceEventMap {
	user_join: SpaceParticipant;
	user_leave: string;
	user_move: {
		id: string;
		new_position: Position;
	};
	users: Record<string, SpaceParticipant>;
	message: SpaceMessage;
	chat_history: SpaceMessage[];
}

/**
 * This manager class processes data about a cluster as it arrives.
 */
export default class SpaceManager implements NodeJS.EventEmitter {
	participants: Record<string, SpaceParticipant> = {};

	constructedWorldData = new Map<ChunkPosition, ChunkData>();
	spaceMetadata: SpaceMetadata = {};

	private outboundMessageQueue: [string, any][] = [];

	private connection: WebSocket | null = null;
	private connected: boolean = false;

	renderer: Renderer | null = null;
	chatEngine: SpaceChatEngine;

	private listeners_: {
		[key in keyof SpaceEventMap]?: Set<(data: SpaceEventMap[key]) => void>;
	} = {};

	private handleWebsocketEvent(type: string, payload: string) {
		console.log({type, payload});
		let parsed = JSON.parse(payload);
		switch (type) {
			case 'message':
				this.emit('message', JSON.parse(payload));
				break;
			case 'chat_history':
				this.emit('chat_history', JSON.parse(payload));
				break;
			case 'users':
				this.emit('users', JSON.parse(payload));
				break;
			case 'user_join':
				this.participants[parsed.id] = parsed;
				this.emit('user_join', parsed);
				break;
			case 'user_leave':
				delete this.participants[parsed];
				this.emit('user_leave', parsed);
				break;
			case 'user_move':
				this.participants[parsed.id].position = parsed.new_position;
				this.emit('user_move', parsed);
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

	addListener<K extends keyof SpaceEventMap>(
		event: K,
		listener: (data: SpaceEventMap[K]) => void
	): this {
		if (!(event in this.listeners_)) {
			this.listeners_[event] = new Set() as any;
		}
		// @ts-expect-error
		this.listeners_[event]!.add(listener);
		throw new Error('Method not implemented.');
	}
	on<K extends keyof SpaceEventMap>(
		event: K,
		listener: (data: SpaceEventMap[K]) => void
	): this {
		return this.addListener(event, listener);
	}
	once<K extends keyof SpaceEventMap>(
		event: K,
		listener: (data: SpaceEventMap[K]) => void
	): this {
		const l = (data: SpaceEventMap[typeof event]) => {
			listener(data);
			this.removeListener(event, l);
		};
		throw this.addListener(event, l);
	}
	removeListener<K extends keyof SpaceEventMap>(
		event: K,
		listener: (data: SpaceEventMap[K]) => void
	): this {
		if (event in this.listeners_) {
			// @ts-expect-error
			this.listeners_[event]?.delete(listener);
		}
		return this;
	}
	off<K extends keyof SpaceEventMap>(
		event: K,
		listener: (data: SpaceEventMap[K]) => void
	): this {
		this.removeListener(event, listener);
		throw new Error('Method not implemented.');
	}
	removeAllListeners(event?: keyof SpaceEventMap): this {
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
	listeners(event: keyof SpaceEventMap): Function[] {
		if (event in this.listeners_) {
			// @ts-expect-error
			return Array.from(this.listeners_[event]!);
		} else {
			return [];
		}
	}
	rawListeners(event: keyof SpaceEventMap): Function[] {
		throw new Error('Method not implemented.');
	}
	emit<K extends keyof SpaceEventMap>(
		event: K,
		data: SpaceEventMap[K]
	): boolean {
		if (event in this.listeners_) {
			this.listeners_[event]!.forEach((listener: any) => listener(data));
			return this.listeners_[event]!.size > 0;
		}
		return false;
	}
	listenerCount(event: keyof SpaceEventMap): number {
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
