import {SpaceMessage} from '../../typings/Space';
import ChatState from './ChatState';
import SDKBase from './SDKBase';

export default class ChatSDK extends SDKBase<ChatState> {
	addMessagesToSpace(spaceId: string, messages: SpaceMessage[]) {
		this.state = this.state.addMessagesToSpace(spaceId, messages);
	}
	getMessagesInSpace(spaceId: string) {
		return this.state.getMessagesInSpace(spaceId);
	}
	getInitialState() {
		return new ChatState();
	}
}
