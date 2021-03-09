/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
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
import SpaceChatEngine from './ChatEngine';
import JSONBig from 'json-bigint';

const logger = getLogger('space');

export interface SpaceEventMap {
	user_join: SpaceParticipant;
	user_leave: string;
	user_move: {
		id: string;
		new_position: Position;
	};
	user_direction: {
		id: string;
		direction: 'left' | 'right';
	};
	users: Record<string, SpaceParticipant>;
	message: SpaceMessage;
	chat_history: SpaceMessage[];
	auth: {
		space_id: string;
		participant_id: string;
	};
}

/**
 * This manager class processes data about a cluster as it arrives.
 */
export default class SpaceManager {
	participants: Record<string, SpaceParticipant> = {};

	constructedWorldData = new Map<ChunkPosition, ChunkData>();
	spaceMetadata: SpaceMetadata = {};

	private outboundMessageQueue: [string, any][] = [];

	private connection: WebSocket | null = null;
	private connected: boolean = false;

	chatEngine: SpaceChatEngine;

	participantID: string | null = null;

	private listeners_: {
		[key in keyof SpaceEventMap]?: Set<(data: SpaceEventMap[key]) => void>;
	} = {};

	private handleWebsocketEvent(type: string, payload: string) {
		let data = JSONBig({storeAsString: true}).parse(payload);
		switch (type) {
			case 'message':
				this.emit('message', data);
				break;
			case 'chat_history':
				this.emit('chat_history', data);
				break;
			case 'users':
				this.participants = data;
				this.emit('users', data);
				break;
			case 'me':
			case 'user_join':
				this.participants[data.id] = data;
				this.participants[data.id] = data;
				this.emit('user_join', data);
				break;
			case 'user_leave':
				delete this.participants[data];
				this.emit('user_leave', data);
				break;
			case 'user_move':
				this.participants[data.id].position = data.new_position;
				this.emit('user_move', data);
				break;
			case 'user_direction':
				this.participants[data.id].moving_direction = data.direction;
				this.emit('user_direction', data);
				break;
			case 'auth':
				logger.debug({event: 'authenticated', data});
				this.participantID = data.participantID;
				this.emit('auth', data);
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

	constructor(public readonly id: string) {
		this.chatEngine = new SpaceChatEngine(this);
	}

	on<K extends keyof SpaceEventMap>(
		event: K,
		listener: (data: SpaceEventMap[K]) => void
	): this {
		if (!(event in this.listeners_)) {
			this.listeners_[event] = new Set() as any;
		}
		// @ts-expect-error
		this.listeners_[event]!.add(listener);
		return this;
	}

	off<K extends keyof SpaceEventMap>(
		event: K,
		listener: (data: SpaceEventMap[K]) => void
	): this {
		if (event in this.listeners_) {
			// @ts-expect-error
			this.listeners_[event]?.delete(listener);
		}
		return this;
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
		this.connection?.close();
	}
}
