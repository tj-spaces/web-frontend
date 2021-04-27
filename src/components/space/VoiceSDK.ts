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
		this.voiceUpstream?.startSendingTrack(track, 'user');
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

	addUser(user: RTCUser) {
		this.state = this.state.set(
			'rtcUsers',
			this.state.rtcUsers.set(user.id, user)
		);
	}

	hasUser(userID: string) {
		return this.state.rtcUsers.has(userID);
	}

	removeUser(userID: string) {
		const user = this.state.rtcUsers.get(userID);
		if (user) {
			user.trackIDs.forEach((id) => {
				this.removeTrackIDFromUser(userID, id);
				const track = this.state.tracks.get(id);
				if (track) {
					this.removeTrackByID(track.trackID);
				}
			});
			this.state = this.state.set(
				'rtcUsers',
				this.state.rtcUsers.delete(userID)
			);
		}
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
		if (rtcUser) {
			this.state = this.state.set(
				'rtcUsers',
				this.state.rtcUsers.set(userId, rtcUser.removeStream(stream))
			);
		}
	}

	addTrack(track: VoiceImmutableMediaTrack) {
		this.state = this.state.set(
			'tracks',
			this.state.tracks.set(track.trackID!, track)
		);
	}

	removeTrackByID(trackID: string) {
		this.state = this.state.set('tracks', this.state.tracks.delete(trackID));
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
		if (rtcUser) {
			this.state = this.state.set(
				'rtcUsers',
				this.state.rtcUsers.set(userId, rtcUser.removeTrackID(trackId))
			);
		}
	}
}
