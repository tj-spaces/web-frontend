import JSONBig from 'json-bigint';
import {DISABLE_DEV_SIMULATION_SERVER_SSL} from '../../../lib/constants';
import {SpaceParticipant} from '../../../typings/Space';
import ChatSDK from '../chat/ChatSDK';
import SimulationServerState from './SimulationServerState';
import SDKBase from '../../../lib/SDKBase';
import * as immutable from 'immutable';
import SpaceParticipantRecord, {
	spaceParticipantMapToImmutableMapOfRecords,
} from '../SpaceParticipantRecord';
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

export default class SimulationServerSDK extends SDKBase<SimulationServerState> {
	private _websocket: WebSocket | null = null;

	participants: Record<string, SpaceParticipant> = {};
	participantID: string | null = null;

	private outboundMessageQueue: [string, any][] = [];

	constructor(private chatSDK: ChatSDK) {
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

	private addParticipant(participant: SpaceParticipantRecord) {
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
		participants: immutable.Map<string, SpaceParticipantRecord>
	) {
		this.state = this.state.set('participants', participants);
	}

	getParticipant(participantId: string) {
		return this.state.participants.get(participantId, null);
	}

	updateParticipant(
		participantId: string,
		updater: (participant: SpaceParticipantRecord) => SpaceParticipantRecord
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
		let data = JSONBig({storeAsString: true}).parse(payload);
		switch (type) {
			case 'message':
				this.chatSDK.addMessagesToSpace('0', [data]);
				break;
			case 'chat_history':
				this.chatSDK.addMessagesToSpace('0', data);
				break;
			case 'users':
				this.setParticipants(spaceParticipantMapToImmutableMapOfRecords(data));
				break;
			case 'me':
			case 'user_join':
				this.addParticipant(new SpaceParticipantRecord(data));
				break;
			case 'user_leave':
				this.removeParticipant(data);
				break;
			case 'user_move':
				this.updateParticipant(data.id, (participant) =>
					participant.moveTo(data.new_position)
				);
				break;
			case 'auth':
				logger.debug({event: 'authenticated', data});
				this.state = this.state.set(
					'anonymousParticipantID',
					data.participant_id
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

	/**
	 *
	 * @returns Whether the user is authenticated or not.
	 */
	isAuthenticated() {
		return this.participantID != null;
	}

	connect(host: string, token: string) {
		this._websocket = new WebSocket(
			(DISABLE_DEV_SIMULATION_SERVER_SSL ? 'ws' : 'wss') + '://' + host
		);

		this._websocket.addEventListener('open', () => {
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

		this._websocket.addEventListener('close', () => {
			console.log({
				event: 'simulationServerWebsocketClose',
				timestamp: new Date(),
			});
		});
	}

	disconnect() {
		this._websocket?.close();
		console.info({
			event: 'disconnectFromSpaceSimulation',
			timestamp: new Date(),
		});
	}
}
