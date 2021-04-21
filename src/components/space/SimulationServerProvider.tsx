import {ReactNode, useMemo} from 'react';
import useSDKState from '../../hooks/useSDKState';
import {ChatProvider} from './ChatProvider';
import ChatSDK from './ChatSDK';
import {useSimulationURL} from './SimulationHooks';
import SimulationServerContext from './SimulationServerContext';
import SimulationServerSDK from './SimulationServerSDK';

export default function SimulationServerProvider({
	children,
	simulationURL,
	token,
}: {
	children: ReactNode;
	simulationURL?: string;
	token?: string;
}) {
	const chatSDK = useMemo(() => new ChatSDK(), []);
	const simulationSDK = useMemo(() => new SimulationServerSDK(chatSDK), [
		chatSDK,
	]);
	const simulationState = useSDKState(simulationSDK);

	useSimulationURL(simulationSDK, simulationURL, token);

	return (
		<SimulationServerContext.Provider value={{simulationSDK, simulationState}}>
			<ChatProvider chatSDK={chatSDK}>{children}</ChatProvider>
		</SimulationServerContext.Provider>
	);
}
