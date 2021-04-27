import {Record, Map, Set} from 'immutable';
import VoiceUser from './VoiceUser';
import VoiceImmutableMediaTrack from './VoiceImmutableMediaTrack';

export type VoiceStateProps = {
	streams: Map<string, Set<VoiceImmutableMediaTrack>>;
	users: Map<string, VoiceUser>;
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
				this.users
					.get(userID, new VoiceUser({id: userID}))
					.addStreamID(streamID)
			)
		);
	}
	deleteStream(userID: string, streamID: string) {
		let state = this;
		if (state.users.has(userID)) {
			const newUser = state.users.get(userID)!.removeStreamID(streamID);
			if (newUser.streamIDs.size === 0) {
				state = state.set('users', state.users.delete(userID));
			} else {
				state = state.set('users', state.users.set(userID, newUser));
			}
		}
		state = state.set('streams', state.streams.delete(streamID));
		return state;
	}
	deleteTrack(userID: string, streamID: string, trackID: string) {
		let state = this;
		state = state.set(
			'streams',
			state.streams.set(
				streamID,
				state.streams
					.get(streamID, Set())
					.filter((track) => track.trackID !== trackID)
			)
		);
		if (state.streams.get(streamID, Set()).size === 0) {
			state = state.deleteStream(userID, streamID);
		}
		return state;
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
	getTracks(streamID: string) {
		const stream = this.streams.get(streamID);
		if (!stream) {
			return [];
		} else {
			return stream.toArray();
		}
	}
	getLocalUserTracks() {
		return this.getTracks('@me:user');
	}
	getLocalScreenTracks() {
		return this.getTracks('@me:screen');
	}
}
