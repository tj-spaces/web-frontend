import {Map, Record} from 'immutable';
import SpaceParticipantRecord from '../SpaceParticipantRecord';

/**
 * 'unconnected': Connection has not been attempted yet
 */
export type ConnectionState =
	| 'unconnected'
	| 'connecting'
	| 'connected'
	| 'failed';

export type SimulationServerStateProps = {
	participants: Map<string, SpaceParticipantRecord>;
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
