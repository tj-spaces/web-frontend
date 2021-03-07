interface VoiceServerEventMap {
	addtrack: {
		userID: string;
		track: MediaStreamTrack;
	};
	removetrack: {
		userID: string;
		track: MediaStreamTrack;
	};
}

/**
 * Basic class for handling a connection to a Voice server.
 */
export class VoiceServer implements NodeJS.EventEmitter {
	private peer = new RTCPeerConnection();

	/**
	 * Tracks by the local user. When we send a local track,
	 * we receive an RTPSender object. When we want to remove this track,
	 * we must pass the RTPSender object.
	 */
	private localTracks: Record<string, RTCRtpSender> = {};

	/**
	 * Stores a map of [trackID] -> MediaStreamTrack
	 */
	private remoteTracks: Record<string, MediaStreamTrack> = {};

	/**
	 * Stores a map of [userID] -> MediaStreamTrack[].
	 */
	private tracksByUser: Record<string, MediaStreamTrack[]> = {};

	/**
	 * If we receive a correlation between a track and a user before receiving the track,
	 * then we store it here. When the track is added, we remove it from this map, and add
	 * it to tracksByUser.
	 */
	private deferredTrackCorrelations: Record<string, string> = {};

	/**
	 * The "voice server websocket."
	 */
	private ws: WebSocket;

	/**
	 * If we want to send a message to the server before a connection has been
	 * established, it gets stored here. When the connection is established,
	 * messages from this list are sent in the order they were enqueued.
	 */
	private outgoingWebsocketMessageQueue: string[] = [];

	/**
	 * Contains a set of media streams that have event handlers attached.
	 * These event handlers, for now, simply detect whether a track has been
	 * removed or not.
	 */
	private handledMediaStreamIDs = new Set<string>();

	constructor(url: string) {
		this.peer.addEventListener('track', this.handlePeerTrackEvent.bind(this));

		this.peer.addEventListener(
			'icecandidate',
			this.handlePeerICEEvent.bind(this)
		);

		this.ws = new WebSocket(url);

		this.ws.addEventListener('open', this.handleWebsocketOpenEvent.bind(this));

		this.ws.addEventListener(
			'message',
			this.handleWebsocketMessageEvent.bind(this)
		);
	}

	/**
	 * Handles a new track received from the Voice server.
	 * If the track is already correlated with a given user, we add
	 * it to the user's list of tracks.
	 * @param event The native event
	 */
	private handlePeerTrackEvent(event: RTCTrackEvent) {
		let track = event.track;
		this.remoteTracks[track.id] = event.track;

		if (track.id in this.deferredTrackCorrelations) {
			let sourceUserID = this.deferredTrackCorrelations[track.id];
			this.correlateTrackWithUser(track.id, sourceUserID);
		}

		event.streams.forEach((stream) => {
			if (!this.handledMediaStreamIDs.has(stream.id)) {
				this.handledMediaStreamIDs.add(stream.id);
				this.addMediaStreamEventListeners(stream);
			}
		});
	}

	/**
	 * When the client gets an ICE server candidate (from the browser),
	 * it sends the candidate to the Voice server.
	 * @param event The native event
	 */
	private handlePeerICEEvent(event: RTCPeerConnectionIceEvent) {
		if (event.candidate) {
			this.sendMessage('candidate', JSON.stringify(event.candidate));
		}
	}

	/**
	 * Sends the list of queued messages, if there are any.
	 */
	private handleWebsocketOpenEvent() {
		this.sendQueuedMessages();
	}

	/**
	 * Parses the event data as JSON, and processes it.
	 * @param event The native event.
	 */
	private handleWebsocketMessageEvent(event: MessageEvent<string>) {
		try {
			let msg = JSON.parse(event.data);

			switch (msg.event) {
				case 'offer':
					let offer = JSON.parse(msg.data);
					this.peer.setRemoteDescription(offer);
					this.peer.createAnswer().then((answer) => {
						this.peer.setLocalDescription(answer);
						this.sendMessage('answer', JSON.stringify(answer));
					});
					break;

				case 'candidate':
					let candidate = JSON.parse(msg.data);
					this.peer.addIceCandidate(candidate);
					break;

				case 'track_source':
					let [trackID, userID] = msg.data.split(':');
					this.correlateTrackWithUser(trackID, userID);
					break;
			}
		} catch (error) {
			console.error('Failed to parse data for message: ', event.data);
		}
	}

	/**
	 * Adds the 'removetrack' event handler to a given MediaStream.
	 * This way, when we stop receiving a track, we can dispatch this
	 * as an event.
	 * @param stream The MediaStream to add listeners to
	 */
	private addMediaStreamEventListeners = (stream: MediaStream) => {
		//
	};

	/**
	 * Handles the case that a track has not been received, but we already
	 * know which user it will go to. When we receive the track from the
	 * PeerConnection, it will be added to that user's list of tracks.
	 * @param trackID The ID of the track
	 * @param userID The ID of the user
	 */
	private addDeferredTrackCorrelation = (trackID: string, userID: string) => {
		this.deferredTrackCorrelations[trackID] = userID;
	};

	/**
	 * When we receive a track, we don't receive any other information about it.
	 * This method is called when we receive a 'track_user' event from the Voice server
	 * websocket: it's for correlating a track with a user.
	 * @param trackID The ID of the track
	 * @param userID The ID of the user
	 */
	private correlateTrackWithUser = (trackID: string, userID: string) => {
		if (trackID in this.remoteTracks) {
			if (!(userID in this.tracksByUser)) {
				this.tracksByUser[userID] = [];
			}

			this.tracksByUser[userID].push(this.remoteTracks[trackID]);
		} else {
			this.addDeferredTrackCorrelation(trackID, userID);
		}
	};

	/**
	 * Sends the messages in the message queue.
	 */
	private sendQueuedMessages = () => {
		while (this.outgoingWebsocketMessageQueue.length > 0) {
			let message = this.outgoingWebsocketMessageQueue.shift()!;
			if (this.ws.readyState === this.ws.OPEN) {
				this.ws.send(message);
			} else {
				console.warn('sendQueuedMessages(): WebSocket is not open');
				break;
			}
		}
	};

	/**
	 * Serializes an event and a payload as a WebSocket event, and sends it
	 * to the Voice server.
	 * @param event The event (string)
	 * @param data The data (string, most of the time a JSON string)
	 */
	private sendMessage = (event: string, data: string) => {
		if (this.ws.readyState === this.ws.OPEN) {
			this.ws.send(JSON.stringify({event, data}));
		} else {
			this.outgoingWebsocketMessageQueue.push(JSON.stringify({event, data}));
		}
	};

	/**
	 * Closes the connection to the websocket and the peer.
	 */
	disconnect() {
		this.ws.close();
		this.peer.close();
	}

	/**
	 * Joins a room with a given ID by sending a request to the Voice server.
	 * @param id The ID of the room to join
	 */
	joinRoom(id: string) {
		this.sendMessage('join_room', id);
	}

	/**
	 * Starts transmitting this track to the Voice server.
	 * @param track The track to add
	 */
	addLocalTrack(track: MediaStreamTrack) {
		this.localTracks[track.id] = this.peer.addTrack(track);
	}

	/**
	 * Stops transmitting this track to the Voice server.
	 */
	removeLocalTrack(track: MediaStreamTrack) {
		this.peer.removeTrack(this.localTracks[track.id]);
		delete this.localTracks[track.id];
	}

	private listeners_: {
		[key in keyof VoiceServerEventMap]?: Set<
			(data: VoiceServerEventMap[key]) => void
		>;
	} = {};
	addListener<K extends keyof VoiceServerEventMap>(
		event: K,
		listener: (data: VoiceServerEventMap[K]) => void
	): this {
		if (!(event in this.listeners_)) {
			this.listeners_[event] = new Set() as any;
		}
		this.listeners_[event]!.add(listener);
		return this;
	}
	on<K extends keyof VoiceServerEventMap>(
		event: K,
		listener: (data: VoiceServerEventMap[K]) => void
	): this {
		return this.addListener(event, listener);
	}
	once<K extends keyof VoiceServerEventMap>(
		event: K,
		listener: (data: VoiceServerEventMap[K]) => void
	): this {
		const l = (data: VoiceServerEventMap[typeof event]) => {
			listener(data);
			this.removeListener(event, l);
		};
		throw this.addListener(event, l);
	}
	removeListener<K extends keyof VoiceServerEventMap>(
		event: K,
		listener: (data: VoiceServerEventMap[K]) => void
	): this {
		if (event in this.listeners_) {
			this.listeners_[event]?.delete(listener);
		}
		return this;
	}
	off<K extends keyof VoiceServerEventMap>(
		event: K,
		listener: (data: VoiceServerEventMap[K]) => void
	): this {
		this.removeListener(event, listener);
		throw new Error('Method not implemented.');
	}
	removeAllListeners(event?: keyof VoiceServerEventMap): this {
		if (event) {
			this.listeners_[event]?.clear();
		} else {
			// Memory leak? IDK
			this.listeners_ = {};
		}
		return this;
	}
	setMaxListeners(n: number): this {
		throw new Error('Method not implemented.');
	}
	getMaxListeners(): number {
		throw new Error('Method not implemented.');
	}
	listeners(event: keyof VoiceServerEventMap): Function[] {
		if (event in this.listeners_) {
			return Array.from(this.listeners_[event]!);
		} else {
			return [];
		}
	}
	rawListeners(event: keyof VoiceServerEventMap): Function[] {
		throw new Error('Method not implemented.');
	}
	emit<K extends keyof VoiceServerEventMap>(
		event: K,
		data: VoiceServerEventMap[K]
	): boolean {
		if (event in this.listeners_) {
			this.listeners_[event]!.forEach((listener: any) => listener(data));
			return this.listeners_[event]!.size > 0;
		}
		return false;
	}
	listenerCount(event: keyof VoiceServerEventMap): number {
		if (event in this.listeners_) {
			return this.listeners_[event]!.size;
		}
		return 0;
	}
	prependListener(
		event: string | symbol,
		listener: (...args: any[]) => void
	): this {
		throw new Error('Method not implemented.');
	}
	prependOnceListener(
		event: string | symbol,
		listener: (...args: any[]) => void
	): this {
		throw new Error('Method not implemented.');
	}
	eventNames(): (string | symbol)[] {
		throw new Error('Method not implemented.');
	}
}

/**
 * Manages connections to several voice servers, for example during a webinar.
 * Also manages the uplink to the primary voice server: the one that we transmit
 * our voice data to.
 */
export class VoiceServerCluster {
	/**
	 * The internal mapping of URLs to connections to Voice servers.
	 */
	private nodes: Record<string, VoiceServer> = {};

	/**
	 * The URL of the server to transmit our voice data to.
	 */
	private primaryVoiceServerURL: string | null = null;

	private localTracks = new Set<MediaStreamTrack>();

	/**
	 * Adds a voice server to the cluster.
	 * @param url The URL of the voice server
	 */
	addVoiceServer(url: string) {
		if (!(url in this.nodes)) {
			this.nodes[url] = new VoiceServer(url);
		}
	}

	/**
	 * Disconnects from and removes a voice server from the cluster.
	 * @param url The URL of the voice server
	 */
	removeVoiceServer(url: string) {
		if (url in this.nodes) {
			this.nodes[url].disconnect();
			delete this.nodes[url];
		}
	}

	/**
	 * Sets the primary voice server: the server to use when transmitting OUR
	 * voice data. All other voice servers in the cluster are only for listening.
	 * @param url The URL of the primary voice server to use
	 */
	setPrimaryVoiceServer(url: string) {
		if (!(url in this.nodes)) {
			throw new Error('Voice server not added: ' + url);
		}

		if (this.primaryVoiceServerURL != null) {
			// Stop transmitting tracks to the previous primary voice server.
			let previous = this.nodes[this.primaryVoiceServerURL];

			this.localTracks.forEach((track) => previous.removeLocalTrack(track));
		}

		let current = this.nodes[url];
		// Add the tracks to the new server
		this.localTracks.forEach((track) => current.addLocalTrack(track));
		// Update the internal URL of the primary voice server
		this.primaryVoiceServerURL = url;
	}
}
