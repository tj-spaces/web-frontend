import {useEffect, useState} from 'react';
import SimulationServer from './SimulationServer';
import SimulationServerContext from './SimulationServerContext';

export default function SimulationWrapper({
	children,
	id,
	simulationURL,
	token,
}: {
	children: React.ReactNode;
	id: string;
	simulationURL?: string;
	token?: string;
}) {
	const [simulation, setSimulation] = useState<SimulationServer>();

	useEffect(() => {
		if (simulationURL && token) {
			let simulation = new SimulationServer(id, simulationURL, token);
			// simulation.on('connected', () => setConnectionStatus('connected'));
			setSimulation(simulation);

			return () => {
				simulation.destroy();
			};
		}
	}, [id, simulationURL, token]);

	if (!simulation) {
		return null;
	}

	return (
		<SimulationServerContext.Provider value={simulation}>
			{children}
		</SimulationServerContext.Provider>
	);
}
