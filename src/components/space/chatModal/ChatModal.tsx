/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useCallback, useContext, useRef, useState} from 'react';
import {createStylesheet} from '../../../styles/createStylesheet';
import {SpaceMessage} from '../../../typings/Space';
import BaseButton from '../../base/BaseButton';
import BaseModal from '../../base/BaseModal';
import BaseRow from '../../base/BaseRow';
import BaseText from '../../base/BaseText';
import SpaceManagerContext from '../ManagerContext';
import ChatMessageList from './ChatMessageList';
import ReplyToMessageContext from './ReplyToMessageContext';

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
	const space = useContext(SpaceManagerContext);
	const messageTextRef = useRef<HTMLInputElement>(null);
	const [pressingEscape, setPressingEscape] = useState(false);
	const [replyToMessage, setReplyToMessage] = useState<SpaceMessage | null>(
		null
	);

	const onClickedSendMessage = useCallback(() => {
		if (space && messageTextRef.current?.value) {
			space.sendChatMessage(
				messageTextRef.current?.value,
				replyToMessage?.id ?? null
			);
			messageTextRef.current.value = '';
		}
	}, [space, replyToMessage?.id]);

	return (
		<BaseModal onClose={onClose}>
			<ReplyToMessageContext.Provider
				value={{message: replyToMessage, setMessage: setReplyToMessage}}
			>
				<BaseRow direction="column">
					<BaseText variant="secondary-title">Chat</BaseText>

					<ChatMessageList xstyle={styles.chatModalMessageList} />

					{replyToMessage && (
						<>
							Replying to {replyToMessage.content}.{' '}
							<BaseText onClick={() => setReplyToMessage(null)}>
								[cancel]
							</BaseText>
						</>
					)}

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

						<BaseButton
							variant="positive"
							onClick={() => onClickedSendMessage()}
						>
							Send
						</BaseButton>
					</BaseRow>
				</BaseRow>
			</ReplyToMessageContext.Provider>
		</BaseModal>
	);
}
