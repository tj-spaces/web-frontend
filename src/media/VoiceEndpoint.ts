/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useContext, useEffect, useState} from 'react';
import AuthContext from '../components/AuthContext';
import SpaceMediaContext from '../components/space/SpaceMediaContext';
import {getLogger} from '../lib/ClusterLogger';
import {USE_VOICE_SERVER_SSL} from '../lib/constants';

const logger = getLogger('space/media');

export interface VoiceServerEventMap {
	addtrack: {
		userID: string;
		track: MediaStreamTrack;
	};
	removetrack: {
		userID: string;
		track: MediaStreamTrack;
	};
}

export interface VoiceServerLike {
	on<K extends keyof VoiceServerEventMap>(
		event: K,
		listener: (data: VoiceServerEventMap[K]) => void
	): this;
	off<K extends keyof VoiceServerEventMap>(
		event: K,
		listener?: (data: VoiceServerEventMap[K]) => void
	): this;
	emit<K extends keyof VoiceServerEventMap>(
		event: K,
		data: VoiceServerEventMap[K]
	): boolean;
	getUserTracks(userID: string): Set<MediaStreamTrack>;
}

/**
 * Basic class for handling a connection to a Voice server.
 */
export class VoiceEndpoint implements VoiceServerLike {
	private peer = new RTCPeerConnection();

	/**
	 * Tracks by the local user. When we send a local track,
	 * we receive an RTPSender object. When we want to remove this track,
	 * we must pass the RTPSender object.
	 */
	private localTracks: Record<string, RTCRtpSender> = {};

	private remoteTracksByStream: Record<string, Set<MediaStreamTrack>> = {};

	/**
	 * Stores a map of [trackID] -> MediaStreamTrack
	 */
	private remoteTracks: Record<string, MediaStreamTrack> = {};

	/**
	 * Stores a map of [userID] -> MediaStreamTrack[].
	 */
	private tracksByUser: Record<string, Set<MediaStreamTrack>> = {};

	/**
	 * Map of [mediaStreamID] -> userID.
	 *
	 * Useful for if we receive a correlation between a stream and a user before receiving the track.
	 */
	private streamToUser: Record<string, string> = {};

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

	private userID: string;
	readonly url: string;

	constructor(url: string, userID: string) {
		const wssRegex = /^wss?:\/\//;
		if (!wssRegex.test(url)) {
			url = (USE_VOICE_SERVER_SSL ? 'wss://' : 'ws://') + url + '/websocket';
		}

		this.userID = userID;
		this.url = url;

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

		this.ws.addEventListener('error', (error) => {
			logger.error({event: 'websocket_connect', error, url});
		});

		this.ws.addEventListener('close', () => {
			logger.info({event: 'websocket_close'});
		});
	}

	getUserTracks(userID: string): Set<MediaStreamTrack> {
		return userID in this.tracksByUser ? this.tracksByUser[userID] : new Set();
	}

	/**
	 * Handles a new track received from the Voice server.
	 * If the track is already correlated with a given user, we add
	 * it to the user's list of tracks.
	 * @param event The native event
	 */
	private handlePeerTrackEvent(event: RTCTrackEvent) {
		let track = event.track;
		let stream = event.streams[0];

		logger.info({event: 'receive_track', data: event});

		if (!(stream.id in this.remoteTracksByStream)) {
			this.remoteTracksByStream[stream.id] = new Set();
		}

		this.remoteTracksByStream[stream.id].add(track);

		let userID = stream.id.slice('user_'.length);
		this.addTrackToUser(userID, track);

		if (!this.handledMediaStreamIDs.has(stream.id)) {
			this.handledMediaStreamIDs.add(stream.id);
			this.addMediaStreamEventListeners(stream);
		}
	}

	private addTrackToUser(userID: string, track: MediaStreamTrack) {
		if (!(userID in this.tracksByUser)) {
			this.tracksByUser[userID] = new Set();
		}
		this.tracksByUser[userID].add(track);
		this.emit('addtrack', {userID, track});
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
		logger.info({event: 'websocket_open_success'});
		this.ws.send(JSON.stringify({event: 'auth', data: this.userID}));
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

				case 'stream_source':
					let [streamID, userID] = msg.data.split(': ');
					this.streamToUser[streamID] = userID;
					if (streamID in this.remoteTracksByStream) {
						this.remoteTracksByStream[streamID].forEach((track) => {
							// this.emit('addtrack', {userID, track});
						});
					}
					break;
			}
		} catch (error) {
			logger.error({event: 'parse_websocket_message', error, data: event.data});
		}
	}

	/**
	 * Adds the 'removetrack' event handler to a given MediaStream.
	 * This way, when we stop receiving a track, we can dispatch this
	 * as an event.
	 * @param stream The MediaStream to add listeners to
	 */
	private addMediaStreamEventListeners = (stream: MediaStream) => {
		stream.addEventListener('removetrack', (event) => {
			this.removeRemoteTrack(event.track);
		});
	};

	/**
	 * Removes a remote track. If the track was correlated to a user,
	 * then we emit the 'removetrack' event. Otherwise, no event is
	 * emitted.
	 * @param track The track to remove.
	 */
	private removeRemoteTrack(track: MediaStreamTrack) {
		delete this.remoteTracks[track.id];
		if (track.id in this.streamToUser) {
			let userID = this.streamToUser[track.id];
			delete this.streamToUser[track.id];
			this.tracksByUser[userID].delete(track);
			this.emit('removetrack', {userID, track});
		}
	}

	/**
	 * Handles the case that a track has not been received, but we already
	 * know which user it will go to. When we receive the track from the
	 * PeerConnection, it will be added to that user's list of tracks.
	 * @param trackID The ID of the track
	 * @param userID The ID of the user
	 */
	private addDeferredTrackCorrelation = (trackID: string, userID: string) => {
		this.streamToUser[trackID] = userID;
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
				logger.warn({
					event: 'send_queued_messages',
					warning: 'Websocket is not open',
				});
				break;
			}
		}
	};

	/**
	 * Serializes an event and a payload as a WebSocket event, and sends it
	 * to the Voice server. If the Websocket isn't ready, it's sent to the queue.
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
	addLocalTrack(track: MediaStreamTrack, stream: MediaStream) {
		logger.info({event: 'add_local_track', track});
		this.localTracks[track.id] = this.peer.addTrack(track, stream);
	}

	/**
	 * Stops transmitting this track to the Voice server.
	 */
	removeLocalTrack(track: MediaStreamTrack) {
		if (track.id in this.localTracks) {
			logger.info({event: 'remove_local_track', track});
			this.peer.removeTrack(this.localTracks[track.id]);
			delete this.localTracks[track.id];
		}
	}

	private listeners_: {
		[key in keyof VoiceServerEventMap]?: Set<
			(data: VoiceServerEventMap[key]) => void
		>;
	} = {};
	on<K extends keyof VoiceServerEventMap>(
		event: K,
		listener: (data: VoiceServerEventMap[K]) => void
	): this {
		if (!(event in this.listeners_)) {
			this.listeners_[event] = new Set() as any;
		}
		this.listeners_[event]!.add(listener);
		return this;
	}
	off<K extends keyof VoiceServerEventMap>(
		event: K,
		listener: (data: VoiceServerEventMap[K]) => void
	): this {
		if (event in this.listeners_) {
			this.listeners_[event]?.delete(listener);
		}
		return this;
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
}

/**
 * Manages connections to several voice servers, for example during a webinar.
 * Also manages the uplink to the primary voice server: the one that we transmit
 * our voice data to.
 */
export class VoiceServerCluster implements VoiceServerLike {
	/**
	 * The internal mapping of URLs to connections to Voice servers.
	 */
	private nodes: Record<string, VoiceEndpoint> = {};

	/**
	 * The URL of the server to transmit our voice data to.
	 */
	private primaryVoiceServerURL: string | null = null;
	private localTracks = new Set<[MediaStreamTrack, MediaStream]>();
	private tracksByUser: Record<string, Set<MediaStreamTrack>> = {};

	private userID: string;
	constructor(userID: string) {
		this.userID = userID;
	}

	getUserTracks(userID: string): Set<MediaStreamTrack> {
		return userID in this.tracksByUser ? this.tracksByUser[userID] : new Set();
	}

	/**
	 * Adds a voice server to the cluster.
	 * @param url The URL of the voice server
	 */
	addVoiceServer(url: string) {
		if (!(url in this.nodes)) {
			let server = new VoiceEndpoint(url, this.userID);
			// Forward events
			server.on('addtrack', (data) => {
				this.tracksByUser[data.userID].add(data.track);
				this.emit('addtrack', data);
			});
			server.on('removetrack', (data) => {
				this.tracksByUser[data.userID].delete(data.track);
				this.emit('removetrack', data);
			});
			this.nodes[url] = server;
		} else {
			logger.warn({event: 'add_voice_server', warning: 'URL already added'});
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

			this.localTracks.forEach(([track]) => previous.removeLocalTrack(track));
		}

		let current = this.nodes[url];
		// Add the tracks to the new server
		this.localTracks.forEach(([track, stream]) =>
			current.addLocalTrack(track, stream)
		);
		// Update the internal URL of the primary voice server
		this.primaryVoiceServerURL = url;
	}

	private listeners_: {
		[key in keyof VoiceServerEventMap]?: Set<
			(data: VoiceServerEventMap[key]) => void
		>;
	} = {};
	on<K extends keyof VoiceServerEventMap>(
		event: K,
		listener: (data: VoiceServerEventMap[K]) => void
	): this {
		if (!(event in this.listeners_)) {
			this.listeners_[event] = new Set() as any;
		}
		this.listeners_[event]!.add(listener);
		return this;
	}
	off<K extends keyof VoiceServerEventMap>(
		event: K,
		listener: (data: VoiceServerEventMap[K]) => void
	): this {
		if (event in this.listeners_) {
			this.listeners_[event]?.delete(listener);
		}
		return this;
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
}

/**
 * React hook to use a given user's media tracks.
 */
export function useTracks(server: VoiceServerLike | null, userID: string) {
	const [tracks, setTracks] = useState<MediaStreamTrack[]>();
	const {user} = useContext(AuthContext);
	const {
		localDevices: {mediaStream},
	} = useContext(SpaceMediaContext);

	useEffect(() => {
		if (userID === user?.id) {
			// Then these are our local tracks
			if (mediaStream) {
				setTracks(mediaStream.getTracks());
			} else {
				setTracks(undefined);
			}

			return;
		}

		if (server == null) {
			setTracks(undefined);
			return;
		}

		setTracks(Array.from(server.getUserTracks(userID)));
		logger.debug({label: 'initial_tracks', data: server.getUserTracks(userID)});

		const onAddTrack = (data: VoiceServerEventMap['addtrack']) => {
			logger.debug({label: 'add_track', data});
			setTracks((tracks) => {
				if (!tracks) {
					return [data.track];
				}
				for (let track of tracks) {
					if (track.id === data.track.id) {
						return tracks;
					}
				}
				return [...tracks, data.track];
			});
		};

		const onRemoveTrack = (data: VoiceServerEventMap['removetrack']) => {
			logger.debug({label: 'remove_track', data});
			setTracks((tracks) =>
				tracks ? tracks.filter((track) => track !== data.track) : []
			);
		};

		server.on('addtrack', onAddTrack);
		server.on('removetrack', onRemoveTrack);

		return () => {
			server.off('addtrack', onAddTrack);
			server.off('removetrack', onRemoveTrack);
		};
	}, [mediaStream, server, user?.id, userID]);

	return tracks;
}