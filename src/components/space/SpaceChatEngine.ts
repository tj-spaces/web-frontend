import {useEffect, useState} from 'react';
import {SpaceMessage} from '../../typings/Space';
import SpaceManager from './SpaceManager';

export type SpaceMessageListener = (message: SpaceMessage) => void;

export default class SpaceChatEngine {
	private listeners = new Set<SpaceMessageListener>();
	private messages: SpaceMessage[] = [];

	constructor(private parent: SpaceManager) {}

	getMessageList() {
		return this.messages;
	}

	addMessageListener(listener: SpaceMessageListener) {
		this.listeners.add(listener);
	}

	removeMessageListener(listener: SpaceMessageListener) {
		this.listeners.delete(listener);
	}

	onMessage(message: SpaceMessage) {
		this.messages.push(message);
		this.listeners.forEach((listener) => listener(message));
	}

	sendChatMessage(message: string) {
		this.parent.send('chat', message);
	}
}

export function useMessages(engine: SpaceChatEngine) {
	const [messages, setMessages] = useState<SpaceMessage[]>(
		engine.getMessageList()
	);

	useEffect(() => {
		setMessages(engine.getMessageList());

		const listener = (message: SpaceMessage) => {
			setMessages((messages) => [...messages, message]);
		};

		engine.addMessageListener(listener);

		return () => {
			setMessages([]);
			engine.removeMessageListener(listener);
		};
	}, [engine]);

	return messages;
}
