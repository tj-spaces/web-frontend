import {Record, Map, Set} from 'immutable';
import RTCUser from './RTCUser';
import VoiceImmutableMediaTrack from './VoiceImmutableMediaTrack';

export type VoiceStateProps = {
	streams: Map<string, Set<VoiceImmutableMediaTrack>>;
	users: Map<string, RTCUser>;
};

export default class VoiceState extends Record<VoiceStateProps>({
	streams: Map(),
	users: Map(),
}) {
	private addTrackToStream(streamID: string, track: VoiceImmutableMediaTrack) {
		const stream = this.streams.get(streamID, Set()).add(track);
		return this.set('streams', this.streams.set(streamID, stream));
	}
	private addStreamToUser(streamID: string, userID: string) {
		return this.set(
			'users',
			this.users.set(
				userID,
				this.users.get(userID, new RTCUser({id: userID})).addStreamID(streamID)
			)
		);
	}
	addTrack(track: VoiceImmutableMediaTrack, streamID: string, userID: string) {
		let state = this;
		if (!state.streams.has(streamID)) {
			state.addStream(streamID, userID);
		}
		return state.addTrackToStream(streamID, track);
	}
	addStream(streamID: string, userID: string) {
		let state = this;
		state = state.set('streams', state.streams.set(streamID, Set()));
		state = state.addStreamToUser(streamID, userID);
		return state;
	}
	addLocalUserTrack(track: VoiceImmutableMediaTrack) {
		return this.addTrack(track, '@me:user', '@me');
	}
	addLocalScreenTrack(track: VoiceImmutableMediaTrack) {
		return this.addTrack(track, '@me:screen', '@me');
	}
}
