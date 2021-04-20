import {useContext} from 'react';
import SimulationServerContext from './SimulationServerContext';

export function useMyAnonymousID() {
	const {simulationState} = useContext(SimulationServerContext);
	return simulationState.anonymousParticipantID;
}

export function useParticipants() {
	const {simulationState} = useContext(SimulationServerContext);

	return simulationState.participants;
}
