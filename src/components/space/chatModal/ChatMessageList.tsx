/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {ClassProvider} from '../../../styles/createStylesheet';
import BaseRow from '../../base/BaseRow';
import {useSpaceMessages} from '../chat/ChatHooks';
import ChatMessage from './ChatMessage';

export default function ChatMessageList({xstyle}: {xstyle?: ClassProvider}) {
	const messages = useSpaceMessages('_');

	return (
		<BaseRow direction="column" overflow="scroll" width="100%" xstyle={xstyle}>
			{messages?.map((message) => (
				<ChatMessage message={message} key={message.id} />
			))}
		</BaseRow>
	);
}
