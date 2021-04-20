import {Map, Record} from 'immutable';
import SpaceParticipantRecord from './SpaceParticipantRecord';

export type SimulationServerStateProps = {
	participants: Map<string, SpaceParticipantRecord>;
	anonymousParticipantID: string;
};

export default class SimulationServerState extends Record<SimulationServerStateProps>(
	{
		participants: Map(),
		anonymousParticipantID: '0',
	}
) {
	//
}
