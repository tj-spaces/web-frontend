import {useCallback, useContext, useRef, useState} from 'react';
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
		width: '100%',
	},
	chatMessageBox: {
		width: '100%',
		fontSize: '1.5rem',
	},
	chatModalMessageList: {
		height: '16rem',
	},
});

export default function ChatModal({onClose}: {onClose: () => void}) {
	const conn = useContext(SpaceConnectionContext);
	const messageTextRef = useRef<HTMLInputElement>(null);
	const [pressingEscape, setPressingEscape] = useState(false);

	const onClickedSendMessage = useCallback(() => {
		if (conn && messageTextRef.current?.value) {
			conn.emit('message', messageTextRef.current?.value);
			messageTextRef.current.value = '';
		}
	}, [conn]);

	return (
		<BaseModal onClickOutside={onClose}>
			<BaseRow direction="column">
				<BaseText variant="secondary-title">Chat</BaseText>

				<ChatMessageList xstyle={styles.chatModalMessageList} />

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
						onKeyUp={(ev) => {
							// Send message when the user presses enter
							if (ev.key === 'Enter') {
								// If the user is pressing "escape" don't sent the message
								// Because we wanna help ya out :)
								if (!pressingEscape) {
									onClickedSendMessage();
								} else {
									setPressingEscape(false);
								}
							} else if (ev.key === 'Escape') {
								setPressingEscape(false);
							}
						}}
						onKeyDown={(ev) => {
							if (ev.key === 'Escape') {
								setPressingEscape(true);
							}
						}}
					/>

					<BaseButton variant="positive" onClick={() => onClickedSendMessage()}>
						Send
					</BaseButton>
				</BaseRow>
			</BaseRow>
		</BaseModal>
	);
}
