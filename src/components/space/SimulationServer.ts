/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {getLogger} from '../../lib/ClusterLogger';
import {
	DisplayStatus,
	Position,
	SpaceMessage,
	SpaceParticipant,
} from '../../typings/Space';
import JSONBig from 'json-bigint';
import {DISABLE_DEV_SIMULATION_SERVER_SSL} from '../../lib/constants';
import ChatSDK from './ChatSDK';

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
	authenticated: string;
	disconnected: void;
	connected: void;
}

/**
 * Specifies a velocity in each direction.
 */
export interface MovementDirection {
	x: number;
	y: number;
	z: number;
}

/**
 * This manager class processes data about a cluster as it arrives.
 */
export default class SimulationServer {
	participants: Record<string, SpaceParticipant> = {};
	participantID: string | null = null;

	/**
	 * The ID of the space.
	 */
	readonly spaceID: string;

	/**
	 * The address of the host simulation server.
	 */
	readonly host: string;

	private outboundMessageQueue: [string, any][] = [];
	private connection: WebSocket | null = null;
	private messages: SpaceMessage[] = [];

	private listeners_: {
		[key in keyof SpaceEventMap]?: Set<(data: SpaceEventMap[key]) => void>;
	} = {};

	sendChatMessage(content: string, reply_to: number | null = null) {
		this.send('chat', {content, reply_to});
	}

	getMessages() {
		return this.messages.slice();
	}

	private handleEvent(type: string, payload: string) {
		let data = JSONBig({storeAsString: true}).parse(payload);
		switch (type) {
			case 'message':
				this.messages.push(data);
				this.emit('message', data);
				break;
			case 'chat_history':
				this.messages = data;
				this.emit('chat_history', data);
				break;
			case 'users':
				this.participants = data;
				this.emit('users', data);
				break;
			case 'me':
			case 'user_join':
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
				// this.participants[data.id].moving_direction = data.direction;
				this.emit('user_direction', data);
				break;
			case 'auth':
				logger.debug({event: 'authenticated', data});
				this.participantID = data.participant_id;
				this.emit('authenticated', data.participant_id);
				break;
		}
	}

	/**
	 *
	 * @returns Whether the user is authenticated or not.
	 */
	isAuthenticated() {
		return this.participantID != null;
	}

	connect(host: string, token: string) {
		this.connection = new WebSocket(
			(DISABLE_DEV_SIMULATION_SERVER_SSL ? 'ws' : 'wss') + '://' + host
		);

		this.connection.addEventListener('open', () => {
			this.connection?.send('connect:' + token);
			this.emit('connected', undefined);
		});

		this.connection.addEventListener(
			'message',
			(message: MessageEvent<string>) => {
				let colonIndex = message.data.indexOf(':');
				let type =
					colonIndex > -1 ? message.data.slice(0, colonIndex) : message.data;
				let payload = colonIndex > -1 ? message.data.slice(colonIndex + 1) : '';

				this.handleEvent(type, payload);
			}
		);

		this.connection.addEventListener('close', () => {
			// What to do if the connection closes?
			this.emit('disconnected', undefined);
		});
	}

	constructor(id: string, host: string, token: string, chatSDK: ChatSDK) {
		this.spaceID = id;
		this.host = host;
		this.connect(host, token);
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

	/**
	 * Sends a message to the server requesting that the user be displayed with a certain status.
	 * @param status The status to display
	 */
	setStatus(status: DisplayStatus) {
		this.send('display-status', status);
	}

	/**
	 * Sends a message to the server requesting to start moving in a direction.
	 * @param direction The direction to move in.
	 */
	setMoveDirection(direction: MovementDirection) {
		this.send('move', direction);
	}

	/**
	 * Sets the velocity in each direction to 0.
	 */
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
		if (
			this.connection &&
			this.connection.readyState === this.connection.OPEN
		) {
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
