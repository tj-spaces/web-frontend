import {useContext} from 'react';
import {ClassProvider} from '../../../styles/createStylesheet';
import BaseRow from '../../base/BaseRow';
import {useMessages} from '../SpaceChatEngine';
import SpaceManagerContext from '../SpaceManagerContext';
import ChatMessage from './ChatMessage';

export default function ChatMessageList({xstyle}: {xstyle?: ClassProvider}) {
	const manager = useContext(SpaceManagerContext);
	const messages = useMessages(manager.chatEngine);

	console.log(messages);

	return (
		<BaseRow direction="column" overflow="scroll" width="100%" xstyle={xstyle}>
			{messages.map((message) => (
				<ChatMessage message={message} key={message.id} />
			))}
		</BaseRow>
	);
}
