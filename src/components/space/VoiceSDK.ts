import RTCUser from './RTCUser';
import SDKBase from './SDKBase';
import VoiceDownstream from './VoiceDownstream';
import VoiceImmutableMediaTrack from './VoiceImmutableMediaTrack';
import VoiceState from './VoiceState';
import VoiceUpstream from './VoiceUpstream';

export default class VoiceSDK extends SDKBase<VoiceState> {
	// This lets us get a list of the users associated with a Downstream
	private voiceDownstreamDelegates = new Map<VoiceDownstream, Set<string>>();
	// This lets us get the Downstream associated with a user
	private userToVoiceDownstream = new Map<string, VoiceDownstream>();
	// This stores each downstream by its signaling url
	private internalDownstreamCache = new Map<string, VoiceDownstream>();
	private voiceUpstream: VoiceUpstream | null = null;

	setVoiceUpstreamUrl(url: string) {
		this.voiceUpstream = new VoiceUpstream(url);
	}

	addLocalTrack(track: MediaStreamTrack, type: 'screen' | 'user') {
		if (!this.voiceUpstream) {
			console.warn('Voice upstream does not exist');
		} else {
			this.voiceUpstream.startSendingTrack(track, type);
		}
	}

	removeLocalTrackByID(trackID: string) {
		if (!this.voiceUpstream) {
			console.warn('Voice upstream does not exist');
		} else {
			this.voiceUpstream.stopSendingTrackByID(trackID);
		}
	}

	getInitialState() {
		return new VoiceState();
	}

	private getOrCreateDownstream(downstreamUrl: string) {
		if (!this.internalDownstreamCache.has(downstreamUrl)) {
			const downstream = new VoiceDownstream(downstreamUrl, this);
			this.internalDownstreamCache.set(downstreamUrl, downstream);
			return downstream;
		} else {
			return this.internalDownstreamCache.get(downstreamUrl)!;
		}
	}

	associateUserWithDownstream(userID: string, downstreamUrl: string) {
		const downstream = this.getOrCreateDownstream(downstreamUrl);
		if (this.voiceDownstreamDelegates.has(downstream)) {
			this.voiceDownstreamDelegates.get(downstream)?.add(userID);
		} else {
			this.voiceDownstreamDelegates.set(downstream, new Set([userID]));
		}
		this.userToVoiceDownstream.set(userID, downstream);
	}

	disassociateUserFromDownstream(userID: string, downstreamUrl: string) {
		const downstream = this.internalDownstreamCache.get(downstreamUrl);
		if (downstream) {
			this.voiceDownstreamDelegates.get(downstream)?.delete(userID);
		}
		this.userToVoiceDownstream.delete(userID);
	}

	addTrack(track: VoiceImmutableMediaTrack, userID: string) {
		let state = this.state;
		// Add RTCUser if we need to
		if (!state.rtcUsers.has(userID)) {
			state = state.set(
				'rtcUsers',
				state.rtcUsers.set(userID, new RTCUser({id: userID}))
			);
		}

		const rtcUser = state.rtcUsers.get(userID)!;

		state = state.set('tracks', state.tracks.set(track.trackID, track));
		state = state.set(
			'rtcUsers',
			state.rtcUsers.set(userID, rtcUser.addTrackID(track.trackID))
		);

		this.state = state;
	}

	removeTrackByID(trackID: string, userID: string) {
		let state = this.state;
		// Update rtcUsers
		if (state.rtcUsers.has(userID)) {
			const newRTCUser = state.rtcUsers.get(userID)!.removeTrackID(trackID);
			if (newRTCUser.trackIDs.size === 0) {
				state = state.set('rtcUsers', state.rtcUsers.delete(userID));
			} else {
				state = state.set('rtcUsers', state.rtcUsers.set(userID, newRTCUser));
			}
		}
		// Update tracks
		state = state.set('tracks', this.state.tracks.delete(trackID));
		// Emit change
		this.state = state;
	}
}
