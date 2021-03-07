import {useEffect, useState} from 'react';
import {SpaceMessage} from '../../typings/Space';
import SpaceManager from './Manager';

export type SpaceMessageListener = (message: SpaceMessage) => void;

export default class SpaceChatEngine {
	private listeners = new Set<SpaceMessageListener>();
	private messages: SpaceMessage[] = [];

	constructor(private parent: SpaceManager) {
		parent.addListener('message', this.receivedMessage);
		parent.addListener(
			'chat_history',
			(messages) => (this.messages = messages)
		);
	}

	getMessageList() {
		return this.messages;
	}

	addMessageListener(listener: SpaceMessageListener) {
		this.listeners.add(listener);
	}

	removeMessageListener(listener: SpaceMessageListener) {
		this.listeners.delete(listener);
	}

	private receivedMessage = (message: SpaceMessage) => {
		this.messages.push(message);
		this.listeners.forEach((listener) => listener(message));
	};

	sendChatMessage(content: string, reply_to: number | null = null) {
		this.parent.send('chat', {content, reply_to});
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
