import {useContext, useEffect, useState} from 'react';
import * as twilio from 'twilio-video';
import SpaceManagerContext from './SpaceManagerContext';
// import {getLogger} from '../../lib/ClusterLogger';

// const logger = getLogger('space/media');

type AddParticipantListener = (participant: twilio.Participant) => void;
type RemoveParticipantListener = (participant: twilio.Participant) => void;

export default class SpaceMediaEngine {
	private room: twilio.Room | null = null;

	private participants = new Map<string, twilio.Participant>();
	private addListeners = new Set<AddParticipantListener>();
	private removeListeners = new Set<RemoveParticipantListener>();

	private cameraEnabled = false;
	private microphoneEnabled = false;

	addAddParticipantListener(listener: AddParticipantListener) {
		this.addListeners.add(listener);
	}

	addRemoveParticipantListener(listener: RemoveParticipantListener) {
		this.removeListeners.add(listener);
	}

	removeAddParticipantListener(listener: AddParticipantListener) {
		this.addListeners.delete(listener);
	}

	removeRemoveParticipantListener(listener: RemoveParticipantListener) {
		this.removeListeners.delete(listener);
	}

	private addParticipant(participant: twilio.Participant) {
		this.participants.set(participant.sid, participant);
		this.addListeners.forEach((listener) => listener(participant));
	}

	private removeParticipant(participant: twilio.Participant) {
		this.participants.delete(participant.sid);
		this.removeListeners.forEach((listener) => listener(participant));
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

	getParticipants() {
		return this.participants;
	}
}

export function useTwilioParticipants() {
	const manager = useContext(SpaceManagerContext);
	const [participants, setParticipants] = useState<
		Record<string, twilio.Participant>
	>({});

	useEffect(() => {
		const addListener: AddParticipantListener = (p) => {
			setParticipants((participants) => ({...participants, [p.identity]: p}));
		};
		const removeListener: RemoveParticipantListener = (p) => {
			setParticipants(({[p.identity]: _, ...participants}) => participants);
		};

		manager.mediaEngine.addAddParticipantListener(addListener);
		manager.mediaEngine.addRemoveParticipantListener(removeListener);

		let participantMap: Record<string, twilio.Participant> = {};
		manager.mediaEngine.getParticipants().forEach((value, key) => {
			participantMap[key] = value;
		});
		setParticipants(participantMap);

		return () => {
			manager.mediaEngine.removeAddParticipantListener(addListener);
			manager.mediaEngine.removeRemoveParticipantListener(removeListener);
			setParticipants({});
		};
	}, [manager.mediaEngine]);

	return participants;
}
