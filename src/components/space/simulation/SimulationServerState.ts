import {Map, Record} from 'immutable';
import SpaceParticipant from '../SpaceParticipant';

/**
 * 'unconnected': Connection has not been attempted yet
 */
export type ConnectionState =
	| 'unconnected'
	| 'connecting'
	| 'connected'
	| 'failed';

export type SimulationServerStateProps = {
	participants: Map<string, SpaceParticipant>;
	anonymousParticipantID: string;
	connectionState: ConnectionState;
};

export default class SimulationServerState extends Record<SimulationServerStateProps>(
	{
		participants: Map(),
		anonymousParticipantID: '0',
		connectionState: 'unconnected',
	}
) {
	//
}
