import {Record, Set} from 'immutable';

export type RTCUserState = {
	id: string;
	streams: Set<MediaStream>;
	trackIDs: Set<string>;
};

export class RTCUser extends Record<RTCUserState>({
	id: '',
	streams: Set(),
	trackIDs: Set(),
}) {
	addTrackID(id: string) {
		return this.set('trackIDs', this.trackIDs.add(id));
	}
	removeTrackID(id: string) {
		return this.set('trackIDs', this.trackIDs.delete(id));
	}
	addStream(stream: MediaStream) {
		return this.set('streams', this.streams.add(stream));
	}
	removeStream(stream: MediaStream) {
		return this.set('streams', this.streams.remove(stream));
	}
}
