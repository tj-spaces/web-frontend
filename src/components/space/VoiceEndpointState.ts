import {Record, Map} from 'immutable';
import {RTCUser} from './RTCUser';

export type VoiceEndpointStateProps = {
	signalingConnectionState: 'CONNECTING' | 'OPEN' | 'CLOSED' | 'CLOSING';
	localTracks: Map<string, RTCRtpSender>;
	rtcUsers: Map<string, RTCUser>;
};

export default class VoiceEndpointState extends Record<VoiceEndpointStateProps>(
	{signalingConnectionState: 'CONNECTING', localTracks: Map(), rtcUsers: Map()}
) {
	addLocalTrack(label: string, track: RTCRtpSender) {
		return this.set('localTracks', this.localTracks.set(label, track));
	}

	removeLocalTrack(label: string) {
		return this.set('localTracks', this.localTracks.delete(label));
	}

	setSignalingConnectionState(
		state: VoiceEndpointStateProps['signalingConnectionState']
	) {
		return this.set('signalingConnectionState', state);
	}

	addRTCUser(user: RTCUser) {
		return this.set('rtcUsers', this.rtcUsers.set(user.id, user));
	}

	removeRTCUserById(userId: string) {
		return this.set('rtcUsers', this.rtcUsers.delete(userId));
	}

	updateRTCUser(userId: string, mutator: (user: RTCUser) => RTCUser) {
		const user = this.rtcUsers.get(userId);
		if (user == null) {
			throw new Error('Trying to update nonexistent RTC user');
		}

		return this.set('rtcUsers', this.rtcUsers.set(userId, mutator(user)));
	}
}
