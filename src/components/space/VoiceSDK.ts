import VoiceEndpoint from './VoiceEndpoint';
import VoiceState from './VoiceState';

export type VoiceStateListener = (newState: VoiceState) => void;

export default class VoiceSDK {
	private listeners = new Set<VoiceStateListener>();
	private _state = new VoiceState();

	private set state(newValue: VoiceState) {
		this._state = newValue;
		this.emitChange();
	}

	private get state() {
		return this._state;
	}

	private emitChange() {
		this.listeners.forEach((listener) => listener(this.state));
	}

	addListener(listener: VoiceStateListener) {
		this.listeners.add(listener);
		return {
			remove: () => {
				this.listeners.delete(listener);
			},
		};
	}

	addVoiceEndpoint(endpointId: string) {
		let endpoint = new VoiceEndpoint(endpointId, this);
		this.state = this.state.addVoiceEndpoint(endpointId, endpoint);
	}

	removeVoiceEndpoint(endpointId: string) {
		this.state = this.state.removeVoiceEndpoint(endpointId);
	}

	addStreamToUser(userId: string, stream: MediaStream) {
		const rtcUser = this.state.rtcUsers.get(userId);
		if (!rtcUser) {
			throw new Error('RTCUser not found: ' + userId);
		}

		this.state = this.state.set(
			'rtcUsers',
			this.state.rtcUsers.set(userId, rtcUser.addStream(stream))
		);
	}

	deleteStreamFromUser(userId: string, stream: MediaStream) {
		const rtcUser = this.state.rtcUsers.get(userId);
		if (!rtcUser) {
			throw new Error('RTCUser not found: ' + userId);
		}

		this.state = this.state.set(
			'rtcUsers',
			this.state.rtcUsers.set(userId, rtcUser.removeStream(stream))
		);
	}

	addLocalTrack(track: MediaStreamTrack, stream: MediaStream) {
		const voiceEndpoints = Array.from(this.state.voiceEndpoints.values());
		voiceEndpoints.forEach((endpoint) => {
			endpoint.addLocalTrack(track, stream);
		});
	}

	addTrack(track: MediaStreamTrack) {
		this.state = this.state.set(
			'tracks',
			this.state.tracks.set(track.id, track)
		);
	}

	removeTrack(track: MediaStreamTrack) {
		this.state = this.state.set('tracks', this.state.tracks.delete(track.id));
	}

	addTrackIDToUser(userId: string, trackId: string) {
		const rtcUser = this.state.rtcUsers.get(userId);
		if (!rtcUser) {
			throw new Error('RTCUser not found: ' + userId);
		}

		this.state = this.state.set(
			'rtcUsers',
			this.state.rtcUsers.set(userId, rtcUser.addTrackID(trackId))
		);
	}

	removeTrackIDFromUser(userId: string, trackId: string) {
		const rtcUser = this.state.rtcUsers.get(userId);
		if (!rtcUser) {
			throw new Error('RTCUser not found: ' + userId);
		}

		this.state = this.state.set(
			'rtcUsers',
			this.state.rtcUsers.set(userId, rtcUser.removeTrackID(trackId))
		);
	}
}
