import {useContext} from 'react';
import BaseRow from '../../base/BaseRow';
import SpaceMessagesContext from '../SpaceMessagesContext';
import ChatMessage from './ChatMessage';

export default function ChatMessageList() {
	const messages = useContext(SpaceMessagesContext);
	return (
		<BaseRow direction="column" overflow="scroll" width="100%">
			{messages.map((message) => (
				<ChatMessage message={message} key={message.id} />
			))}
		</BaseRow>
	);
}
