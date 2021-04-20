import {Record, List, Map} from 'immutable';
import {SpaceMessage} from '../../typings/Space';

export type ChatStateProps = {
	chatModalOpen: boolean;
	messagesBySpace: Map<string, List<SpaceMessage>>;
};

export default class ChatState extends Record<ChatStateProps>({
	chatModalOpen: false,
	messagesBySpace: Map(),
}) {
	addMessagesToSpace(spaceId: string, messages: SpaceMessage[]) {
		const previousMessages =
			this.messagesBySpace.get(spaceId) ?? List<SpaceMessage>();

		return this.set(
			'messagesBySpace',
			this.messagesBySpace.set(spaceId, previousMessages.concat(messages))
		);
	}

	clearMessages(spaceId: string) {
		return this.set('messagesBySpace', this.messagesBySpace.delete(spaceId));
	}

	getMessagesInSpace(spaceId: string) {
		return this.get('messagesBySpace').get(spaceId, null);
	}

	setChatModalOpen(open: boolean) {
		return this.set('chatModalOpen', open);
	}
}
