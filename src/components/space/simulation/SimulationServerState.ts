import {Map, Record} from 'immutable';
import SpaceParticipantRecord from '../SpaceParticipantRecord';

export type SimulationServerStateProps = {
	participants: Map<string, SpaceParticipantRecord>;
	anonymousParticipantID: string;
	connectionState: 'connecting' | 'connected' | 'disconnected';
};

export default class SimulationServerState extends Record<SimulationServerStateProps>(
	{
		participants: Map(),
		anonymousParticipantID: '0',
		connectionState: 'disconnected',
	}
) {
	//
}
