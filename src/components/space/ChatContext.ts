import {createContext} from 'react';
import ChatSDK from './ChatSDK';
import ChatState from './ChatState';

export type ChatContextProps = {
	chatState: ChatState;
	chatSDK: ChatSDK;
};

const ChatContext = createContext({
	chatState: new ChatState(),
	chatSDK: new ChatSDK(),
});

export default ChatContext;
