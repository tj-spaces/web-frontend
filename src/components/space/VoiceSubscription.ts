import {useEffect, useMemo, useState} from 'react';
import * as immutable from 'immutable';
import {ContentType} from './SignalingChannel';
import VoiceImmutableMediaTrack from './VoiceImmutableMediaTrack';

export default class VoiceUser {
	private unsubscribed = false;
	private revoked = false;
	private streamRevokeListeners: Set<Function> | null = null;
	private tracks = new Set<VoiceImmutableMediaTrack>();
	private availableContentTypes = new Set<ContentType>();

	constructor(
		public readonly userID: string,
		private subscribeFunction: (
			type: ContentType
		) => Promise<VoiceImmutableMediaTrack>,
		private unsubscribeFunction: (type: ContentType) => Promise<void>,
		addAvailableContentTypesNotifier: (
			notifier: (offers: Set<ContentType>) => void
		) => void
	) {
		addAvailableContentTypesNotifier((offers) =>
			this.updateAvailableContentTypes(offers)
		);
	}

	private updateAvailableContentTypes(contentTypes: Set<ContentType>) {
		this.availableContentTypes = contentTypes;
	}

	isSubscribed() {
		return !this.unsubscribed && !this.revoked;
	}

	isRevoked() {
		return this.revoked;
	}

	isUnsubscribed() {
		return this.unsubscribed;
	}

	requestContentType(contentType: ContentType) {
		//
	}

	unsubscribe(contentType: ContentType) {}

	private onRevoked() {
		this.streamRevokeListeners?.forEach((listener) => listener());
	}

	ifRevoked(fn: () => void) {
		if (this.streamRevokeListeners === null) {
			this.streamRevokeListeners = new Set();
		}
		this.streamRevokeListeners.add(fn);
	}
}

export function useTracks(stream: MediaStream, kind?: 'audio' | 'video') {
	const [tracks, setTracks] = useState<immutable.Set<MediaStreamTrack>>(
		immutable.Set()
	);

	useEffect(() => {
		setTracks(immutable.Set(stream.getTracks()));

		stream.addEventListener('addtrack', (event) => {
			setTracks((tracks) => tracks.add(event.track));
		});

		stream.addEventListener('removetrack', (event) => {
			setTracks((tracks) => tracks.remove(event.track));
		});

		return () => setTracks(immutable.Set());
	}, [stream]);

	return useMemo(() => {
		if (kind) {
			return tracks.filter((track) => track.kind === kind);
		} else {
			return tracks;
		}
	}, [tracks, kind]);
}
