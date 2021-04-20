import {Record, Map} from 'immutable';
import {RTCUser} from './RTCUser';
import VoiceEndpoint from './VoiceEndpoint';
import VoiceEndpointState from './VoiceEndpointState';

export type VoiceStateProps = {
	voiceEndpoints: Map<string, VoiceEndpoint>;
	voiceEndpointStates: Map<string, VoiceEndpointState>;
	tracks: Map<string, MediaStreamTrack>;
	rtcUsers: Map<string, RTCUser>;
	localStream: MediaStream | null;
};

export default class VoiceState extends Record<VoiceStateProps>({
	voiceEndpoints: Map(),
	voiceEndpointStates: Map(),
	tracks: Map(),
	rtcUsers: Map(),
	localStream: null,
}) {
	setLocalStream(localStream: MediaStream | null) {
		return this.set('localStream', localStream);
	}

	getUserTracks(userId: string) {
		const user = this.rtcUsers.get(userId);
		if (user) {
			const tracks: MediaStreamTrack[] = [];
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

	addVoiceEndpoint(endpointId: string, endpoint: VoiceEndpoint) {
		return this.set(
			'voiceEndpoints',
			this.voiceEndpoints.set(endpointId, endpoint)
		);
	}

	removeVoiceEndpoint(endpointId: string) {
		return this.set('voiceEndpoints', this.voiceEndpoints.delete(endpointId));
	}

	getUserStreams(userId: string) {
		if (this.rtcUsers.has(userId)) {
			return this.rtcUsers.get(userId)!.streams;
		} else {
			return null;
		}
	}
}
