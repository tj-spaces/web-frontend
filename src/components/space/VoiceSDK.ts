import RTCUser from './RTCUser';
import SDKBase from './SDKBase';
import {ContentType} from './SignalingChannel';
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
	private requestedContentTypesByUser = new Map<string, Set<ContentType>>();

	setVoiceUpstreamUrl(url: string) {
		this.voiceUpstream = new VoiceUpstream(url);
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
			this.voiceDownstreamDelegates.get(downstream)!.add(userID);
		} else {
			this.voiceDownstreamDelegates.set(downstream, new Set([userID]));
		}

		this.userToVoiceDownstream.set(userID, downstream);

		// If there are some content types we're already requesting,
		// we'll send the subscribe requests.
		const requestedContentTypes = this.requestedContentTypesByUser.get(userID);
		if (requestedContentTypes) {
			requestedContentTypes.forEach((contentType) => {
				downstream.sendSubscribeRequest({userID, contentType});
			});
		}
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

	addLocalTrack(track: VoiceImmutableMediaTrack, type: 'screen' | 'user') {
		let state = this.state;
		state = state.set(
			'localUser',
			this.state.localUser.addTrackID(track.trackID)
		);
		state = state.set('tracks', state.tracks.set(track.trackID, track));
		this.state = state;
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

	private _addRequestedContentTypeForUser(
		userID: string,
		contentType: ContentType
	) {
		if (!this.requestedContentTypesByUser.has(userID)) {
			this.requestedContentTypesByUser.set(userID, new Set([contentType]));
		} else {
			this.requestedContentTypesByUser.get(userID)!.add(contentType);
		}
	}

	private _removeRequestedContentTypeForUser(
		userID: string,
		contentType: ContentType
	) {
		if (this.requestedContentTypesByUser.has(userID)) {
			this.requestedContentTypesByUser.get(userID)!.delete(contentType);
		} else {
			console.warn(
				'removeRequestedContentTypeForUser: user does not have any requested tracks'
			);
		}
	}

	sendSubscribeRequest(userID: string, contentType: ContentType) {
		const downstream = this.userToVoiceDownstream.get(userID);

		this._addRequestedContentTypeForUser(userID, contentType);

		if (!downstream) {
			console.warn(
				'sendSubscribeRequest: No downstream for user, deferring user track request'
			);
			return;
		}

		downstream.sendSubscribeRequest({userID, contentType});
	}

	sendUnsubscribeRequest(userID: string, contentType: ContentType) {
		const downstream = this.userToVoiceDownstream.get(userID);

		this._removeRequestedContentTypeForUser(userID, contentType);

		if (!downstream) {
			console.warn('No downstream for user when trying to unsubscribe');
			return;
		}

		downstream.sendUnsubscribeRequest({userID, contentType});
	}
}
