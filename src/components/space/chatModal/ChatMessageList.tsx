/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useContext} from 'react';
import {useMessages} from '../../../hooks/useMessages';
import {ClassProvider} from '../../../styles/createStylesheet';
import BaseRow from '../../base/BaseRow';
import SimulationServerContext from '../SimulationServerContext';
import ChatMessage from './ChatMessage';

export default function ChatMessageList({xstyle}: {xstyle?: ClassProvider}) {
	const manager = useContext(SimulationServerContext);
	const messages = useMessages(manager);

	return (
		<BaseRow direction="column" overflow="scroll" width="100%" xstyle={xstyle}>
			{messages &&
				messages.map((message) => (
					<ChatMessage message={message} key={message.id} />
				))}
		</BaseRow>
	);
}
