import {Record, Set} from 'immutable';

export type RTCUserState = {
	id: string;
	streamIDs: Set<string>;
};

export default class RTCUser extends Record<RTCUserState>({
	id: '',
	streamIDs: Set(),
}) {
	addTrackID(id: string) {
		return this.set('streamIDs', this.streamIDs.add(id));
	}
	removeTrackID(id: string) {
		return this.set('streamIDs', this.streamIDs.delete(id));
	}
}
