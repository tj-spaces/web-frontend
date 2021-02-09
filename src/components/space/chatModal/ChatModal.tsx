import {useCallback, useContext, useRef} from 'react';
import {createStylesheet} from '../../../styles/createStylesheet';
import BaseButton from '../../base/BaseButton';
import BaseModal from '../../base/BaseModal';
import BaseRow from '../../base/BaseRow';
import BaseText from '../../base/BaseText';
import SpaceConnectionContext from '../SpaceConnectionContext';
import ChatMessageList from './ChatMessageList';

const styles = createStylesheet({
	bottomSection: {
		height: '2rem',
		position: 'absolute',
		left: '0px',
		right: '0px',
		bottom: '0px',
	},
	chatMessageBox: {
		width: '100%',
		fontSize: '1.5rem',
	},
	chatMessageListContainer: {
		position: 'relative',
		minHeight: '16rem',
		maxHeight: '30rem',
	},
});

export default function ChatModal({onClose}: {onClose: () => void}) {
	const conn = useContext(SpaceConnectionContext);
	const messageTextRef = useRef<HTMLInputElement>(null);

	const onClickedSendMessage = useCallback(() => {
		if (conn && messageTextRef.current?.value) {
			conn.emit('message', messageTextRef.current?.value);
			messageTextRef.current.value = '';
		}
	}, [conn]);

	return (
		<BaseModal onClickOutside={onClose}>
			<BaseRow direction="column" xstyle={styles.chatMessageListContainer}>
				<BaseText variant="secondary-title">Chat</BaseText>

				<ChatMessageList />

				<BaseRow
					direction="row"
					alignment="center"
					spacing={1}
					xstyle={styles.bottomSection}
				>
					<input
						type="text"
						ref={messageTextRef}
						className={styles('chatMessageBox')}
					/>

					<BaseButton variant="positive" onClick={() => onClickedSendMessage()}>
						Send
					</BaseButton>
				</BaseRow>
			</BaseRow>
		</BaseModal>
	);
}
