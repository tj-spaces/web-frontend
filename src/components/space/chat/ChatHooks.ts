import {useContext, useMemo} from 'react';
import ChatContext from './ChatContext';

export function useSpaceMessages(spaceId: string) {
	const {chatState} = useContext(ChatContext);

	return useMemo(() => {
		return chatState.getMessagesInSpace(spaceId);
	}, [spaceId, chatState]);
}
