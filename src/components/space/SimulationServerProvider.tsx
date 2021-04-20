import React, {useEffect, useMemo, useState} from 'react';
import ChatSDK from './ChatSDK';
import SimulationServerContext from './SimulationServerContext';
import SimulationServerSDK from './SimulationServerSDK';
import SimulationServerState from './SimulationServerState';

export default function SimulationServerProvider({
	children,
	simulationURL,
}: {
	children: React.ReactNode;
	simulationURL?: string;
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
		if (simulationURL) {
			simulationSDK.connect(simulationURL, 'EMPTY_TOKEN');

			return () => {
				simulationSDK.disconnect();
			};
		}
	}, [simulationSDK, simulationURL]);

	return (
		<SimulationServerContext.Provider value={{simulationSDK, simulationState}}>
			{children}
		</SimulationServerContext.Provider>
	);
}
