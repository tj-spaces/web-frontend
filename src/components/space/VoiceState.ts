import {Record, Map} from 'immutable';
import RTCUser from './RTCUser';
import VoiceImmutableMediaTrack from './VoiceImmutableMediaTrack';

export type VoiceStateProps = {
	tracks: Map<string, VoiceImmutableMediaTrack>;
	rtcUsers: Map<string, RTCUser>;
};

export default class VoiceState extends Record<VoiceStateProps>({
	tracks: Map(),
	rtcUsers: Map(),
}) {
	getUserTracks(userId: string) {
		const user = this.rtcUsers.get(userId);
		if (user) {
			const tracks: VoiceImmutableMediaTrack[] = [];
			user.trackIDs.forEach((trackID) => {
				const track = this.tracks.get(trackID);
				if (track) {
					tracks.push(track);
				}
			});
			return tracks;
		} else {
			return null;
		}
	}
}
