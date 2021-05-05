import getUserMedia from '../../lib/getUserMedia';
import SDKBase from './SDKBase';
import VoiceDownstream, {SubscriptionState} from './VoiceDownstream';
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
		SubscriptionState
	>();

	setReady(ready: boolean) {
		this.state = this.state.setReady(ready);
	}

	connect(userID: string) {
		if (this.voiceUpstream) {
			this.voiceUpstream.connect(userID);
		}
		for (let downstream of Array.from(this.internalDownstreamCache.values())) {
			downstream.connect(userID);
		}
	}

	setVoiceUpstreamUrl(url: string) {
		this.voiceUpstream = new VoiceUpstream(url);
	}

	getInitialState() {
		return new VoiceState();
	}

	private getOrCreateDownstream(url: string) {
		if (!this.internalDownstreamCache.has(url)) {
			const downstream = new VoiceDownstream(url, this);
			this.internalDownstreamCache.set(url, downstream);
			return downstream;
		} else {
			return this.internalDownstreamCache.get(url)!;
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
		let tracks = this.state.getLocalUserTracks();
		if (kind) {
			tracks = tracks.filter((track) => track.kind === kind);
		}

		for (let track of tracks) {
			this.removeLocalUserTrack(track.trackID);
			if (stopTracks) {
				track.webrtcTrack.stop();
			}
		}
	}

	async updateUserMedia(constraints: {audio: boolean; video: boolean}) {
		if (constraints.audio === false) {
			if (this.hasLocalAudio()) {
				this.removeLocalUserTracks('audio', true);
			}
		}
		if (constraints.video === false) {
			if (this.hasLocalVideo()) {
				this.removeLocalUserTracks('video', true);
			}
		}
		let requestAudio = constraints.audio && !this.hasLocalAudio();
		let requestVideo = constraints.video && !this.hasLocalVideo();

		if (requestAudio || requestVideo) {
			console.debug({
				requestAudio,
				requestVideo,
				hasLocalAudio: this.hasLocalAudio(),
				hasLocalVideo: this.hasLocalVideo(),
			});
			const stream = await getUserMedia({
				audio: requestAudio,
				video: requestVideo,
			});
			stream.forEach((track) => this.addLocalUserTrack(track));
		}
	}

	private _updateStreamRequest(
		streamID: string,
		constraints: SubscriptionState
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

	subscribe(streamID: string, constraints: SubscriptionState) {
		const stream = this.state.streams.get(streamID);
		if (stream) {
			let hasEquivalentAudio =
				!!constraints.audio === stream.some((track) => track.kind === 'audio');
			let hasEquivalentVideo =
				!!constraints.video === stream.some((track) => track.kind === 'video');
			if (hasEquivalentAudio && hasEquivalentVideo) {
				return;
			}
		}

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

	hasLocalVideo() {
		return this.streamHasTrackOfKind('@me:user', 'video');
	}

	hasLocalAudio() {
		return this.streamHasTrackOfKind('@me:user', 'audio');
	}

	streamHasTrackOfKind(streamID: string, kind: 'video' | 'audio'): boolean {
		if (this.state.streams.has(streamID)) {
			let stream = this.state.streams.get(streamID);
			return !!stream?.some((track) => track.kind === kind);
		} else {
			return false;
		}
	}
}
