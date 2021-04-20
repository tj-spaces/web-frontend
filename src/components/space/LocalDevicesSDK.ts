import transferMediaTracks from '../../media/transferMediaTracks';
import LocalDevicesState from './LocalDevicesState';

export type LocalDevicesStateListener = (state: LocalDevicesState) => void;

export default class LocalDevicesSDK {
	private listeners = new Set<LocalDevicesStateListener>();
	private _state = new LocalDevicesState();

	private set state(newValue: LocalDevicesState) {
		this._state = newValue;
		this.emitChange();
	}

	private get state() {
		return this._state;
	}

	private emitChange() {
		this.listeners.forEach((listener) => listener(this.state));
	}

	addListener(listener: LocalDevicesStateListener) {
		this.listeners.add(listener);
		return {
			remove: () => {
				this.listeners.delete(listener);
			},
		};
	}

	getMediaStream() {
		return this.state.userMedia;
	}

	setUserMedia(stream: MediaStream | null) {
		let state = this.state
			.set('userMedia', stream)
			.clearUserAudioTracks()
			.clearUserVideoTracks();

		if (stream) {
			for (let track of stream.getVideoTracks()) {
				state = state.addUserVideoTrack(track);
			}
			for (let track of stream.getAudioTracks()) {
				state = state.addUserAudioTrack(track);
			}
		}

		this.state = state;
	}

	closeMediaStream() {
		const mediaStream = this.state.userMedia;
		if (mediaStream) {
			mediaStream.getTracks().forEach((track) => {
				track.stop();
			});
		}

		this.setUserMedia(null);
	}

	stopLocalTracks(kind: 'audio' | 'video') {
		if (this.state.userMedia) {
			this.state.userMedia.getTracks().forEach((track) => {
				if (track.kind === kind) {
					track.stop();
				}
			});
		}
	}

	transferLocalTracksFromStream(stream: MediaStream, kind: 'video' | 'audio') {
		if (this.state.userMedia) {
			transferMediaTracks(stream, this.state.userMedia, kind);

			this.emitChange();
		}
	}
}
