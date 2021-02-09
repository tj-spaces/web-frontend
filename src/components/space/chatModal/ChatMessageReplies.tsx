import {useState} from 'react';
import {createStylesheet} from '../../../styles/createStylesheet';
import {SpaceMessage} from '../../../typings/Space';
import BaseRow from '../../base/BaseRow';
import BaseText from '../../base/BaseText';
import ChatMessage from './ChatMessage';

const styles = createStylesheet({
	chatMessageRepliesContainer: {
		// marginLeft: '0.5rem',
	},
	chatMessageRepliesCollapser: {
		backgroundColor: 'grey',
		height: '100%',
		width: '0.5rem',
	},
});

export default function ChatMessageReplies({
	replies,
}: {
	replies: SpaceMessage[];
}) {
	let [collapsed, setCollapsed] = useState(false);
	if (collapsed) {
		return <BaseText onClick={() => setCollapsed(false)}>See replies</BaseText>;
	} else {
		return (
			<BaseRow direction="row">
				{/* This is the bar that collapses the replies */}
				<div
					className={styles('chatMessageRepliesCollapser')}
					onClick={() => setCollapsed(true)}
				/>

				{/* This is the main reply list */}
				<BaseRow direction="column" xstyle={styles.chatMessageRepliesContainer}>
					{replies.map((reply) => (
						<ChatMessage message={reply} />
					))}
				</BaseRow>
			</BaseRow>
		);
	}
}
