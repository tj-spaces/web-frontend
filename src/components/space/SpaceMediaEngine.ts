import * as twilio from 'twilio-video';
// import {getLogger} from '../../lib/ClusterLogger';

// const logger = getLogger('space/media');

export default class SpaceMediaEngine {
	private room: twilio.Room | null = null;

	private participants = new Map<string, twilio.Participant>();

	private cameraEnabled = false;
	private microphoneEnabled = false;

	private addParticipant(participant: twilio.Participant) {
		this.participants.set(participant.sid, participant);
	}

	private removeParticipant(participant: twilio.Participant) {
		this.participants.delete(participant.sid);
	}

	setTwilioRoom(room: twilio.Room) {
		if (this.room != null) {
			this.room.off('participantConnected', this.addParticipant);
			this.room.off('participantDisconnected', this.removeParticipant);
		}

		this.room = room;

		this.room.on('participantConnected', this.addParticipant);
		this.room.on('participantDisconnected', this.removeParticipant);
	}

	disableCamera() {
		if (!this.cameraEnabled) {
			this.cameraEnabled = false;

			if (this.room) {
				this.room.localParticipant.videoTracks.forEach((publication) => {
					publication.track.stop();
					publication.unpublish();
				});
			}
		}
	}

	enableCamera() {
		if (!this.cameraEnabled) {
			if (!this.room) {
				throw new Error('enableCamera() called without a Room');
			}

			this.cameraEnabled = true;

			twilio.createLocalVideoTrack({width: 640}).then((newLocalVideoTrack) => {
				if (this.room) {
					this.room.localParticipant.publishTrack(newLocalVideoTrack);
				}
			});
		}
	}

	disableMicrophone() {
		if (this.microphoneEnabled) {
			if (this.room == null) {
				throw new Error('disableMicrophone() called without a Room');
			}

			this.room.localParticipant.audioTracks.forEach((audioTrack) => {
				audioTrack.track.disable();
			});
		}
	}

	enableMicrophone() {
		if (!this.microphoneEnabled) {
			if (this.room == null) {
				throw new Error('enableMicrophone() called without a Room');
			}

			this.room.localParticipant.audioTracks.forEach((audioTrack) => {
				audioTrack.track.enable();
			});
		}
	}

	disconnect() {
		if (this.room) {
			// Turn off all video/audio sending when the user leaves the room
			this.room.localParticipant.audioTracks.forEach((publication) => {
				publication.track.stop();
				publication.unpublish();
			});
			this.room.localParticipant.videoTracks.forEach((publication) => {
				publication.track.stop();
				publication.unpublish();
			});

			this.room.disconnect();
		}
	}
}
