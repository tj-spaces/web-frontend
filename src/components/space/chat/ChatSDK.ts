import {SpaceMessage} from '../../../typings/Space';
import ChatState from './ChatState';
import SDKBase from '../../../lib/SDKBase';

export default class ChatSDK extends SDKBase<ChatState> {
	getInitialState() {
		return new ChatState();
	}

	addMessagesToSpace(spaceID: string, messages: SpaceMessage[]) {
		this.state = this.state.addMessagesToSpace(spaceID, messages);
	}

	getMessagesInSpace(spaceID: string) {
		return this.state.getMessagesInSpace(spaceID);
	}
}
