import {useCallback, useState} from 'react';
import useSocketEventListener from '../../hooks/useSocketEventListener';
import {SpaceMessage} from '../../typings/Space';

export default function useSpaceMessages(
	conn: SocketIOClient.Socket
): SpaceMessage[] {
	// This is so if a message is replied to, we can add it in O(1) time
	const [messageMap, setMessageMap] = useState<Record<string, SpaceMessage>>(
		{}
	);
	// We use this to make a list to send to the renderer
	const [topLevelMessageIDs, setTopLevelMessages] = useState<string[]>([]);

	// This is a socket callback
	const addMessage = useCallback(
		(id: string, senderID: string, text: string, replyTo?: string) => {
			let message = {senderID, text, id, replyTo, replies: []};
			setMessageMap((messageMap) => ({...messageMap, [id]: message}));
			// If this is replying to a message, add it to the parent message
			if (replyTo != null) {
				// We need to do this with a setState() so it triggers a render update
				setMessageMap((messageMap) => ({
					[replyTo]: {
						...messageMap[replyTo],
						replies: [...messageMap[replyTo].replies, message],
					},
				}));
			} else {
				setTopLevelMessages((topLevelMessages) => [
					...topLevelMessages,
					message.id,
				]);
			}
		},
		[]
	);

	useSocketEventListener(conn, 'message', addMessage);

	useSocketEventListener(conn, 'message_list', (messages: SpaceMessage[]) => {
		// We receive a list of messages in the order that they were sent
		let messageMap: Record<string, SpaceMessage> = {};
		let topLevelMessages: string[] = [];
		for (let message of messages) {
			messageMap[message.id] = message;
			if (message.replyTo) {
				// Add this message to the reverse index of messages we're replying to
				let replyTo = message.replyTo;
				if (replyTo in messageMap) {
					messageMap[replyTo].replies.push(message);
				}
			} else {
				topLevelMessages.push(message.id);
			}
		}
		setMessageMap(messageMap);
		setTopLevelMessages(topLevelMessages);
	});

	console.log(messageMap, topLevelMessageIDs);

	return topLevelMessageIDs.map((id) => messageMap[id]);
}
