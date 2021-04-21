import RTCUser from './RTCUser';
import SDKBase from './SDKBase';
import VoiceEndpoint from './VoiceEndpoint';
import VoiceState from './VoiceState';

export default class VoiceSDK extends SDKBase<VoiceState> {
	getInitialState() {
		return new VoiceState();
	}

	addVoiceEndpoint(endpointId: string) {
		let endpoint = new VoiceEndpoint(endpointId, this);
		this.state = this.state.addVoiceEndpoint(endpointId, endpoint);
	}

	removeVoiceEndpoint(endpointId: string) {
		const endpoint = this.state.voiceEndpoints.get(endpointId);
		if (endpoint) {
			endpoint.close();
			this.state = this.state.removeVoiceEndpoint(endpointId);
		} else {
			this.emitChange();
		}
	}

	addUser(user: RTCUser) {
		this.state = this.state.set(
			'rtcUsers',
			this.state.rtcUsers.set(user.id, user)
		);
	}

	hasUser(userId: string) {
		return this.state.rtcUsers.has(userId);
	}

	removeUser(userId: string) {
		this.state = this.state.set('rtcUsers', this.state.rtcUsers.delete(userId));
	}

	updateUser(userId: string, updater: (user: RTCUser) => RTCUser) {
		const user = this.state.rtcUsers.get(userId);
		if (user) {
			this.state = this.state.set(
				'rtcUsers',
				this.state.rtcUsers.set(userId, updater(user))
			);
		}
	}

	addStreamToUser(userId: string, stream: MediaStream) {
		const rtcUser = this.state.rtcUsers.get(userId);
		if (!rtcUser) {
			console.log({event: 'addStreamToUser', userId, stream});
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

	removeLocalTrack(track: MediaStreamTrack) {
		const voiceEndpoints = Array.from(this.state.voiceEndpoints.values());
		voiceEndpoints.forEach((endpoint) => {
			endpoint.removeLocalTrack(track);
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

	joinSpace(spaceId: string, userId: string) {
		const voiceEndpoints = Array.from(this.state.voiceEndpoints.values());
		voiceEndpoints.forEach((endpoint) => {
			endpoint.joinSpace(spaceId, userId);
		});
	}

	leaveSpace(spaceId: string) {
		const voiceEndpoints = Array.from(this.state.voiceEndpoints.values());
		voiceEndpoints.forEach((endpoint) => {
			endpoint.leaveSpace();
		});
	}
}
