import {useContext} from 'react';
import {ClassProvider} from '../../../styles/createStylesheet';
import BaseRow from '../../base/BaseRow';
import SpaceMessagesContext from '../SpaceMessagesContext';
import ChatMessage from './ChatMessage';

export default function ChatMessageList({xstyle}: {xstyle?: ClassProvider}) {
	const messages = useContext(SpaceMessagesContext);
	return (
		<BaseRow direction="column" overflow="scroll" width="100%" xstyle={xstyle}>
			{messages.map((message) => (
				<ChatMessage message={message} key={message.id} />
			))}
		</BaseRow>
	);
}
