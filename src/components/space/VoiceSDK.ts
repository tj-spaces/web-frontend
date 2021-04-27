import SDKBase from './SDKBase';
import VoiceDownstream, {
	SubscriptionStreamConstraints,
} from './VoiceDownstream';
import VoiceImmutableMediaTrack from './VoiceImmutableMediaTrack';
import VoiceState from './VoiceState';
import VoiceUpstream from './VoiceUpstream';

export default class VoiceSDK extends SDKBase<VoiceState> {
	// This lets us get a list of the users associated with a Downstream
	private voiceDownstreamDelegates = new Map<VoiceDownstream, Set<string>>();
	// This lets us get the Downstream associated with a user
	private streamToVoiceDownstream = new Map<string, VoiceDownstream>();
	// This stores each downstream by its signaling url
	private internalDownstreamCache = new Map<string, VoiceDownstream>();
	private voiceUpstream: VoiceUpstream | null = null;
	private subscriptionConstraintsByStream = new Map<
		string,
		SubscriptionStreamConstraints
	>();

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

	associateStreamWithDownstream(streamID: string, downstreamUrl: string) {
		const downstream = this.getOrCreateDownstream(downstreamUrl);

		if (this.voiceDownstreamDelegates.has(downstream)) {
			this.voiceDownstreamDelegates.get(downstream)!.add(streamID);
		} else {
			this.voiceDownstreamDelegates.set(downstream, new Set([streamID]));
		}

		this.streamToVoiceDownstream.set(streamID, downstream);

		// If there are some content types we're already requesting,
		// we'll send the subscribe requests.
		const requestedContentTypes = this.subscriptionConstraintsByStream.get(
			streamID
		);
		if (requestedContentTypes) {
			downstream.sendSubscribeRequest(streamID, requestedContentTypes);
		}
	}

	disassociateUserFromDownstream(userID: string, downstreamUrl: string) {
		const downstream = this.internalDownstreamCache.get(downstreamUrl);
		if (downstream) {
			this.voiceDownstreamDelegates.get(downstream)?.delete(userID);
		}
		this.streamToVoiceDownstream.delete(userID);
	}

	addTrack(track: VoiceImmutableMediaTrack, streamID: string, userID: string) {
		this.state = this.state.addTrack(track, streamID, userID);
	}

	removeTrackByID(userID: string, streamID: string, trackID: string) {
		this.state = this.state.deleteTrack(userID, streamID, trackID);
	}

	addLocalScreenTrack(track: VoiceImmutableMediaTrack) {
		this.state = this.state.addLocalScreenTrack(track);
		if (!this.voiceUpstream) {
			console.warn('Voice upstream does not exist');
		} else {
			this.voiceUpstream.startSendingTrack(track, 'screen');
		}
	}

	addLocalUserTrack(track: VoiceImmutableMediaTrack) {
		this.state = this.state.addLocalUserTrack(track);
		if (!this.voiceUpstream) {
			console.warn('Voice upstream does not exist');
		} else {
			this.voiceUpstream.startSendingTrack(track, 'screen');
		}
	}

	removeLocalScreenTrack(trackID: string) {
		this.state = this.state.deleteTrack('@me', '@me:screen', trackID);
		if (!this.voiceUpstream) {
			console.warn('Voice upstream does not exist');
		} else {
			this.voiceUpstream.stopSendingTrackByID(trackID);
		}
	}

	removeLocalUserTrack(trackID: string) {
		this.state = this.state.deleteTrack('@me', '@me:user', trackID);
		if (!this.voiceUpstream) {
			console.warn('Voice upstream does not exist');
		} else {
			this.voiceUpstream.stopSendingTrackByID(trackID);
		}
	}

	removeLocalUserTracks(kind?: 'video' | 'audio', stopTracks = false) {
		const tracks =
			kind !== undefined
				? this.state.getLocalUserTracks().filter((track) => track.kind === kind)
				: this.state.getLocalUserTracks();

		for (let track of tracks) {
			this.removeLocalUserTrack(track.trackID);
			if (stopTracks) {
				track.webrtcTrack?.stop();
			}
		}
	}

	private _updateStreamRequest(
		streamID: string,
		constraints: SubscriptionStreamConstraints
	) {
		this.subscriptionConstraintsByStream.set(streamID, constraints);
	}

	private _deleteStreamRequest(streamID: string) {
		if (this.subscriptionConstraintsByStream.has(streamID)) {
			this.subscriptionConstraintsByStream.delete(streamID);
		} else {
			console.warn(
				'removeRequestedContentTypeForUser: user does not have any requested tracks'
			);
		}
	}

	subscribe(streamID: string, constraints: SubscriptionStreamConstraints) {
		const downstream = this.streamToVoiceDownstream.get(streamID);

		this._updateStreamRequest(streamID, constraints);

		if (!downstream) {
			console.warn(
				'sendSubscribeRequest: No downstream for user, deferring user track request'
			);
			return;
		}

		downstream.sendSubscribeRequest(streamID, constraints);
	}

	unsubscribe(streamID: string) {
		const downstream = this.streamToVoiceDownstream.get(streamID);

		this._deleteStreamRequest(streamID);

		if (!downstream) {
			console.warn('No downstream for stream when trying to unsubscribe');
			return;
		}

		downstream.sendSubscribeRequest(streamID, {audio: false, video: false});
	}
}
