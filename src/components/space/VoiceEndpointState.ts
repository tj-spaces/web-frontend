import {Record, Map} from 'immutable';

export type VoiceEndpointStateProps = {
	signalingConnectionState: 'CONNECTING' | 'OPEN' | 'CLOSED' | 'CLOSING';
	localTracks: Map<string, RTCRtpSender>;
};

export default class VoiceEndpointState extends Record<VoiceEndpointStateProps>(
	{
		signalingConnectionState: 'CONNECTING',
		localTracks: Map(),
	}
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
}
