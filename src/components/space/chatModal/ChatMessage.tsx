import {useContext} from 'react';
import {SpaceMessage} from '../../../typings/Space';
import BaseRow from '../../base/BaseRow';
import BaseText from '../../base/BaseText';
import SpaceParticipantsContext from '../SpaceParticipantsContext';
import ChatMessageReplies from './ChatMessageReplies';

export default function ChatMessage({message}: {message: SpaceMessage}) {
	const participants = useContext(SpaceParticipantsContext);
	return (
		<BaseRow direction="column">
			<BaseText variant="body-bold">
				Sent by {participants[message.senderID].displayName}
			</BaseText>
			<BaseText variant="body">{message.text}</BaseText>
			{message.replies.length > 0 && (
				<ChatMessageReplies replies={message.replies} />
			)}
		</BaseRow>
	);
}
