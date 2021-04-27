import {Record, Set} from 'immutable';

export type RTCUserState = {
	id: string;
	trackIDs: Set<string>;
};

export default class RTCUser extends Record<RTCUserState>({
	id: '',
	trackIDs: Set(),
}) {
	addTrackID(id: string) {
		return this.set('trackIDs', this.trackIDs.add(id));
	}
	removeTrackID(id: string) {
		return this.set('trackIDs', this.trackIDs.delete(id));
	}
}
