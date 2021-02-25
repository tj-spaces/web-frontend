import {useContext} from 'react';
import {SpaceMessage} from '../../../typings/Space';
import BaseRow from '../../base/BaseRow';
import BaseText from '../../base/BaseText';
// import SpaceParticipantsContext from '../SpaceParticipantsContext';
import ChatMessageReplies from './ChatMessageReplies';
import ReplyToMessageContext from './ReplyToMessageContext';

export default function ChatMessage({message}: {message: SpaceMessage}) {
	const {setMessage} = useContext(ReplyToMessageContext);
	// const participants = useContext(SpaceParticipantsContext);
	return (
		<BaseRow direction="column">
			<BaseText variant="body-bold">
				Sent by {'Unknown' /*participants[message.senderID].displayName*/}
			</BaseText>
			<BaseText variant="body">{message.content}</BaseText>
			<BaseText variant="body" onClick={() => setMessage(message)}>
				Reply
			</BaseText>
			{message.replies && message.replies.length > 0 && (
				<ChatMessageReplies replies={message.replies} />
			)}
		</BaseRow>
	);
}
