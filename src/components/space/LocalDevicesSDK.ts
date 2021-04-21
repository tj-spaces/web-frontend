import LocalDevicesState from './LocalDevicesState';
import SDKBase from './SDKBase';

export default class LocalDevicesSDK extends SDKBase<LocalDevicesState> {
	getInitialState() {
		return new LocalDevicesState();
	}

	getMediaStream() {
		return this.state.userMedia;
	}

	setUserMedia(stream: MediaStream | null) {
		console.log('Set user media to', stream);

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
			if (kind === 'audio') {
				this.state = this.state.clearUserAudioTracks();
			} else {
				this.state = this.state.clearUserVideoTracks();
			}
		}
	}

	transferLocalTracksFromStream(stream: MediaStream, kind: 'video' | 'audio') {
		if (this.state.userMedia) {
			for (let track of stream
				.getTracks()
				.filter((track) => track.kind === kind)) {
				this.state.userMedia.addTrack(track);
				stream.removeTrack(track);

				if (kind === 'audio') {
					this.state.addUserAudioTrack(track);
				} else if (kind === 'video') {
					this.state.addUserVideoTrack(track);
				}
			}
			this.emitChange();
		}
	}
}
