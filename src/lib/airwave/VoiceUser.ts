import {Record, Set} from 'immutable';

export type VoiceUserState = {
	id: string;
	streamIDs: Set<string>;
};

export default class VoiceUser extends Record<VoiceUserState>({
	id: '',
	streamIDs: Set(),
}) {
	addStreamID(id: string) {
		return this.set('streamIDs', this.streamIDs.add(id));
	}
	removeStreamID(id: string) {
		return this.set('streamIDs', this.streamIDs.delete(id));
	}
}
