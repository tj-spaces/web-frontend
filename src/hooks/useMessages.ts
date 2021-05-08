import {useState, useEffect} from 'react';
import SimulationServer from '../components/space/simulation/SimulationServer';
import {SpaceMessage} from '../typings/Space';

export function useMessages(space: SimulationServer) {
	const [messages, setMessages] = useState<SpaceMessage[]>();

	useEffect(() => {
		setMessages(space.getMessages());

		const listener = (message: SpaceMessage) => {
			setMessages((messages) => [...messages!, message]);
		};

		space.on('message', listener);

		return () => {
			space.off('message', listener);
			setMessages(undefined);
		};
	}, [space]);

	return messages;
}
