import {useContext, useEffect} from 'react';
import SimulationServerContext from './SimulationServerContext';
import SimulationServerSDK from './SimulationServerSDK';

export function useSpaceID() {
	const {spaceID} = useContext(SimulationServerContext);
	return spaceID;
}

export function useMyAnonymousID() {
	const {simulationState} = useContext(SimulationServerContext);
	return simulationState.anonymousParticipantID;
}

export function useParticipants() {
	const {simulationState} = useContext(SimulationServerContext);

	return simulationState.participants;
}

export function useSimulationURL(
	simulationSDK: SimulationServerSDK,
	simulationURL?: string,
	token?: string
) {
	useEffect(() => {
		if (simulationURL && token) {
			simulationSDK.connect(simulationURL, token);

			return () => {
				simulationSDK.disconnect();
			};
		}
	}, [simulationSDK, simulationURL, token]);
}

export function useMyPosition() {
	const participants = useParticipants();
	const myID = useMyAnonymousID();

	return myID ? participants.get(myID)?.position : null;
}
