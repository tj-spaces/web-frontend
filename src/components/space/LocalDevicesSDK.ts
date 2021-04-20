import {Record} from 'immutable';
import transferMediaTracks from '../../media/transferMediaTracks';

export type LocalDevicesStateProps = {
	cameraEnabled: boolean;
	micEnabled: boolean;
	mediaStream: MediaStream | null;
};

export class LocalDevicesState extends Record<LocalDevicesStateProps>({
	cameraEnabled: false,
	micEnabled: false,
	mediaStream: null,
}) {}

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
		return this.state.mediaStream;
	}

	setMediaStream(stream: MediaStream | null) {
		this.state = this.state.set('mediaStream', stream);
	}

	closeMediaStream() {
		const mediaStream = this.state.mediaStream;
		if (mediaStream) {
			mediaStream.getTracks().forEach((track) => {
				track.stop();
			});
		}

		this.state = this.state.set('mediaStream', null);
	}

	stopLocalTracks(kind: 'audio' | 'video') {
		if (this.state.mediaStream) {
			this.state.mediaStream.getTracks().forEach((track) => {
				if (track.kind === kind) {
					track.stop();
				}
			});
		}
	}

	transferLocalTracksFromStream(stream: MediaStream, kind: 'video' | 'audio') {
		if (this.state.mediaStream) {
			transferMediaTracks(stream, this.state.mediaStream, kind);
			this.emitChange();
		}
	}

	hasLocalVideoTracks() {
		if (!this.state.mediaStream) return false;
		return this.state.mediaStream.getVideoTracks().length > 0;
	}

	hasLocalAudioTracks() {
		if (!this.state.mediaStream) return false;
		return this.state.mediaStream.getAudioTracks().length > 0;
	}
}
