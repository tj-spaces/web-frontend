import React, {useEffect, useMemo, useState} from 'react';
import ChatSDK from './ChatSDK';
import SimulationServerContext from './SimulationServerContext';
import SimulationServerSDK from './SimulationServerSDK';
import SimulationServerState from './SimulationServerState';

export default function SimulationServerProvider({
	children,
	simulationURL,
	token,
}: {
	children: React.ReactNode;
	simulationURL?: string;
	token?: string;
}) {
	const simulationSDK = useMemo(
		() => new SimulationServerSDK(new ChatSDK()),
		[]
	);
	const [simulationState, setSimulationState] = useState(
		new SimulationServerState()
	);

	useEffect(() => {
		const handle = simulationSDK.addListener(setSimulationState);
		return () => handle.remove();
	}, [simulationSDK]);

	useEffect(() => {
		if (simulationURL && token) {
			simulationSDK.connect(simulationURL, token);

			return () => {
				simulationSDK.disconnect();
			};
		}
	}, [simulationSDK, simulationURL, token]);

	return (
		<SimulationServerContext.Provider value={{simulationSDK, simulationState}}>
			{children}
		</SimulationServerContext.Provider>
	);
}
