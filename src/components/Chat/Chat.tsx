import React from 'react';
import Box from '../Box/Box';
import Message from '../Message/Message';

export interface IMessage {
	id: number;
	channel_id: number;
	sender_id: number; // references users
	content: string;
	sent_at: string;
	edited_at?: string;
	was_unsent: boolean;
}

export default function Chat() {
	//{ channelId }: { channelId: string }) {
	// const messages =
	const messages: IMessage[] = [
		{
			id: 0,
			channel_id: 0,
			sender_id: 0,
			content: 'Hello!',
			sent_at: '1 minute ago',
			was_unsent: false
		}
	];

	return (
		<Box>
			<h1>Chat</h1>
			{messages.map((message) => (
				<Message senderName={'USER# ' + message.sender_id} content={message.content} />
			))}
		</Box>
	);
}
