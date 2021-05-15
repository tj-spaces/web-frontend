import JSONBig from 'json-bigint';
import {DISABLE_DEV_SIMULATION_SERVER_SSL} from '../../../lib/constants';
import ChatSDK from '../chat/ChatSDK';
import SimulationServerState, {ConnectionState} from './SimulationServerState';
import SDKBase from '../../../lib/SDKBase';
import * as immutable from 'immutable';
import SpaceParticipant, {
	spaceParticipantMapToImmutableMapOfRecords,
} from '../SpaceParticipant';
import {getLogger} from '../../../lib/ClusterLogger';

const logger = getLogger('space/simulation');

/**
 * Specifies a velocity in each direction.
 */
export interface MovementDirection {
	x: number;
	y: number;
	z: number;
}

const MAX_CONNECTION_RETRIES = 10;
const RECONNECT_INTERVAL = 5000;

export default class SimulationServerSDK extends SDKBase<SimulationServerState> {
	private _websocket: WebSocket | null = null;
	private shouldBeConnected = false;
	private outboundMessageQueue: [string, any][] = [];
	private lastHost: string = '';
	private lastToken: string = '';

	constructor(private chatSDK: ChatSDK, public readonly spaceID: string) {
		super();
	}

	getInitialState() {
		return new SimulationServerState();
	}

	sendChatMessage(content: string, reply_to: number | null = null) {
		this.send('chat', {content, reply_to});
	}

	send(event: string, data: any) {
		if (
			this._websocket &&
			this._websocket.readyState === this._websocket.OPEN
		) {
			this._websocket.send(event + ':' + JSON.stringify(data));
		} else {
			this.outboundMessageQueue.push([event, data]);
		}
	}

	private addParticipant(participant: SpaceParticipant) {
		this.state = this.state.set(
			'participants',
			this.state.participants.set(participant.id, participant)
		);
	}

	private removeParticipant(participantId: string) {
		this.state = this.state.set(
			'participants',
			this.state.participants.delete(participantId)
		);
	}

	private setParticipants(
		participants: immutable.Map<string, SpaceParticipant>
	) {
		this.state = this.state.set('participants', participants);
	}

	getParticipant(participantId: string) {
		return this.state.participants.get(participantId, null);
	}

	updateParticipant(
		participantId: string,
		updater: (participant: SpaceParticipant) => SpaceParticipant
	) {
		const participant = this.getParticipant(participantId);
		if (participant) {
			this.state = this.state.set(
				'participants',
				this.state.participants.set(participantId, updater(participant))
			);
		}
	}

	private handleEvent(type: string, payload: string) {
		let data = payload ? JSONBig({storeAsString: true}).parse(payload) : null;
		switch (type) {
			case 'message':
				this.chatSDK.addMessagesToSpace(this.spaceID, [data]);
				break;
			case 'chat_history':
				this.chatSDK.addMessagesToSpace(this.spaceID, data);
				break;
			case 'users':
				this.setParticipants(spaceParticipantMapToImmutableMapOfRecords(data));
				break;
			case 'me':
			case 'user_join':
				this.addParticipant(new SpaceParticipant(data));
				break;
			case 'user_leave':
				this.removeParticipant(data);
				break;
			case 'user_move':
				this.updateParticipant(data.userID, (participant) =>
					participant.moveTo(data.position)
				);
				break;
			case 'authenticated':
				logger.debug({event: 'authenticated', data});
				this.state = this.state.set(
					'anonymousParticipantID',
					data.participantID
				);
				break;
		}
	}

	setMoveDirection(direction: MovementDirection) {
		this.send('move', direction);
	}

	/**
	 * Sets the velocity in each direction to 0.
	 */
	stopMoving() {
		this.setMoveDirection({x: 0, y: 0, z: 0});
	}

	private setConnectionState(state: ConnectionState) {
		if (this.state.connectionState !== state) {
			this.state = this.state.set('connectionState', state);
			logger.info(`connection state: ${state}`);
		}
	}

	reconnect() {
		if (this.state.connectionState !== 'failed') {
			logger.warn(
				'reconnection attempted when connectionState was not `failed`'
			);
		} else {
			this.connect(this.lastHost, this.lastToken);
		}
	}

	connect(
		host: string,
		token: string,
		remainingTries = MAX_CONNECTION_RETRIES
	) {
		if (this._websocket != null) {
			logger.error('Trying to connect when websocket is active');
			return;
		}

		this.lastHost = host;
		this.lastToken = token;
		this.shouldBeConnected = true;

		this.setConnectionState('connecting');

		this._websocket = new WebSocket(
			(DISABLE_DEV_SIMULATION_SERVER_SSL ? 'ws' : 'wss') + '://' + host
		);

		this._websocket.addEventListener('close', () => {
			this._websocket = null;

			if (this.shouldBeConnected) {
				if (remainingTries <= 0) {
					logger.error(
						`Connection failed after ${MAX_CONNECTION_RETRIES} attempts`
					);
					this.setConnectionState('failed');
					this.shouldBeConnected = false;
				} else {
					this.setConnectionState('connecting');
					setTimeout(() => {
						this.connect(host, token, remainingTries - 1);
					}, RECONNECT_INTERVAL);
				}
			}
		});

		this._websocket.addEventListener('error', () => {
			this._websocket?.close();
		});

		this._websocket.addEventListener('open', () => {
			remainingTries = MAX_CONNECTION_RETRIES;
			this.setConnectionState('connected');
			this._websocket?.send('connect:' + token);
		});

		this._websocket.addEventListener(
			'message',
			(message: MessageEvent<string>) => {
				let colonIndex = message.data.indexOf(':');
				let type =
					colonIndex > -1 ? message.data.slice(0, colonIndex) : message.data;
				let payload = colonIndex > -1 ? message.data.slice(colonIndex + 1) : '';

				this.handleEvent(type, payload);
			}
		);
	}

	disconnect() {
		this.shouldBeConnected = false;

		// The event handler for this will notice that we aren't supposed to be connected
		// It won't try to reconnect
		this._websocket?.close();

		console.info({
			event: 'disconnectFromSpaceSimulation',
			timestamp: new Date(),
		});
	}
}
