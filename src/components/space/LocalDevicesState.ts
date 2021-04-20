import {Record, Set} from 'immutable';

export type LocalDevicesStateProps = {
	userMedia: MediaStream | null;
	userVideoTracks: Set<MediaStreamTrack>;
	userAudioTracks: Set<MediaStreamTrack>;
};

export default class LocalDevicesState extends Record<LocalDevicesStateProps>({
	userMedia: null,
	userVideoTracks: Set(),
	userAudioTracks: Set(),
}) {
	addUserVideoTrack(track: MediaStreamTrack) {
		return this.set('userVideoTracks', this.userVideoTracks.add(track));
	}

	addUserAudioTrack(track: MediaStreamTrack) {
		return this.set('userAudioTracks', this.userAudioTracks.add(track));
	}

	removeUserVideoTrack(track: MediaStreamTrack) {
		return this.set('userVideoTracks', this.userVideoTracks.delete(track));
	}

	removeUserAudioTrack(track: MediaStreamTrack) {
		return this.set('userAudioTracks', this.userAudioTracks.delete(track));
	}

	hasLocalMedia() {
		return this.userMedia;
	}

	getLocalVideoTracks() {
		return this.userVideoTracks;
	}

	getLocalAudioTracks() {
		return this.userAudioTracks;
	}

	getLocalTracks() {
		return this.userAudioTracks.concat(this.userVideoTracks);
	}

	hasLocalVideoTracks() {
		return this.getLocalVideoTracks().size > 0;
	}

	hasLocalAudioTracks() {
		return this.getLocalAudioTracks().size > 0;
	}
}
