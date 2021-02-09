import {SpaceMessage} from '../../../typings/Space';
import BaseRow from '../../base/BaseRow';
import BaseText from '../../base/BaseText';
import ChatMessageReplies from './ChatMessageReplies';

export default function ChatMessage({message}: {message: SpaceMessage}) {
	return (
		<BaseRow direction="column">
			<BaseText variant="body-bold">Sent by {message.senderID}</BaseText>
			<BaseText variant="body">{message.text}</BaseText>
			{message.replies.length > 0 && (
				<ChatMessageReplies replies={message.replies} />
			)}
		</BaseRow>
	);
}
