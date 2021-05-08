import {ReactNode, useMemo} from 'react';
import useSDKState from '../../../hooks/useSDKState';
import {ChatProvider} from '../chat/ChatProvider';
import ChatSDK from '../chat/ChatSDK';
import {useSimulationURL} from './SimulationHooks';
import SimulationServerContext from './SimulationServerContext';
import SimulationServerSDK from './SimulationServerSDK';

export default function SimulationServerProvider({
	children,
	simulationURL,
	token,
	spaceID,
}: {
	children: ReactNode;
	simulationURL?: string;
	token?: string;
	spaceID: string;
}) {
	const chatSDK = useMemo(() => new ChatSDK(), []);
	const simulationSDK = useMemo(
		() => new SimulationServerSDK(chatSDK, spaceID),
		[chatSDK, spaceID]
	);
	const simulationState = useSDKState(simulationSDK);

	useSimulationURL(simulationSDK, simulationURL, token);

	return (
		<SimulationServerContext.Provider
			value={{spaceID, simulationSDK, simulationState}}
		>
			<ChatProvider chatSDK={chatSDK}>{children}</ChatProvider>
		</SimulationServerContext.Provider>
	);
}
