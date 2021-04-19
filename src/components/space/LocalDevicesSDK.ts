import {Record} from 'immutable';

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

	setCameraEnabled(enabled: boolean) {
		this.state = this.state.set('cameraEnabled', enabled);
	}

	setMicEnabled(enabled: boolean) {
		this.state = this.state.set('micEnabled', enabled);
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

	addListener(listener: LocalDevicesStateListener) {
		this.listeners.add(listener);
		return {
			remove: () => {
				this.listeners.delete(listener);
			},
		};
	}
}
