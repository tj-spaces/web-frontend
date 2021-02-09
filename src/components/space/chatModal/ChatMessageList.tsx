import {useContext} from 'react';
import BaseRow from '../../base/BaseRow';
import SpaceMessagesContext from '../SpaceMessagesContext';
import ChatMessage from './ChatMessage';

export default function ChatMessageList() {
	const message = useContext(SpaceMessagesContext);
	return (
		<BaseRow direction="column">
			{Object.values(message).map((message) => (
				<ChatMessage message={message} key={message.id} />
			))}
		</BaseRow>
	);
}
