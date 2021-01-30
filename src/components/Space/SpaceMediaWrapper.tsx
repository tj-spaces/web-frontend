import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as twilio from 'twilio-video';
import { getLogger } from '../../lib/spacesLog';
import SpaceAudioContext from './SpaceAudioContext/SpaceAudioContext';
import SpaceMediaContext from './SpaceMediaContext';

const logger = getLogger('space/media');

export default function SpaceMediaWrapper({
	twilioRoom,
	children
}: {
	twilioRoom: twilio.Room | null;
	children: React.ReactNode;
}) {
	const [twilioParticipants, setTwilioParticipants] = useState<Record<string, twilio.RemoteParticipant>>({});
	const [muted, setMuted] = useState<boolean>(false);
	const [cameraEnabled, setCameraEnabled] = useState<boolean>(true);
	const [localVideoTrack, setLocalVideoTrack] = useState<twilio.LocalVideoTrack | null>(null);
	const audioContext = useRef(new AudioContext());

	// twilioRoom
	useEffect(() => {
		// We have a Twilio room
		if (twilioRoom) {
			// Add handlers for twilio connections
			/**
			 * @param participant The Twilio participant that joined
			 * @param _alreadyHere Whether the participant was here when we joined the room and we are adding them to the state via this function
			 */
			const onParticipantConnected = (participant: twilio.RemoteParticipant, _alreadyHere: boolean = false) => {
				logger('Media Participant Connected: ' + participant.identity);
				let participantId = participant.identity;
				setTwilioParticipants((participants) => {
					return { ...participants, [participantId]: participant };
				});
			};
			const onParticipantDisconnected = (participant: twilio.RemoteParticipant) => {
				logger('Media Participant disconnected: ' + participant.identity);
				let participantId = participant.identity;
				setTwilioParticipants((participants) => {
					let newParticipants = { ...participants };
					delete newParticipants[participantId];
					return newParticipants;
				});
			};

			twilioRoom.on('participantConnected', onParticipantConnected);
			twilioRoom.on('participantDisconnected', onParticipantDisconnected);

			for (let participant of Array.from(twilioRoom.participants.values())) {
				onParticipantConnected(participant, true);
			}

			// Don't forget to remove the handlers if we leave the room
			return () => {
				twilioRoom.off('participantConnected', onParticipantConnected);
				twilioRoom.off('participantDisconnected', onParticipantDisconnected);
				// Turn off all video/audio sending when the user leaves the room
				twilioRoom.localParticipant.audioTracks.forEach((publication) => {
					publication.track.stop();
					publication.unpublish();
				});
				twilioRoom.localParticipant.videoTracks.forEach((publication) => {
					publication.track.stop();
					publication.unpublish();
				});

				twilioRoom.disconnect();
			};
		}
	}, [twilioRoom]);

	const disableAllVideoTracks = useCallback(() => {
		if (twilioRoom) {
			twilioRoom.localParticipant.videoTracks.forEach((publication) => {
				publication.track.stop();
				publication.unpublish();
			});

			setLocalVideoTrack(null);
		}
	}, [twilioRoom]);

	// cameraEnabled
	useEffect(() => {
		if (cameraEnabled) {
			if (twilioRoom) {
				// When enabling the camera, we must get the camera feed again
				twilio.createLocalVideoTrack({ width: 640 }).then((newLocalVideoTrack) => {
					twilioRoom.localParticipant.publishTrack(newLocalVideoTrack);
					setLocalVideoTrack(newLocalVideoTrack);
				});

				// Whenever this changes, disable all video tracks
				return () => disableAllVideoTracks();
			}
		}
	}, [cameraEnabled, disableAllVideoTracks, twilioRoom]);

	// muted
	useEffect(() => {
		if (twilioRoom) {
			if (muted) {
				twilioRoom.localParticipant.audioTracks.forEach((audioTrack) => {
					audioTrack.track.disable();
				});
			} else {
				twilioRoom.localParticipant.audioTracks.forEach((audioTrack) => {
					audioTrack.track.enable();
				});
			}
		}
	}, [muted, twilioRoom]);

	return (
		<SpaceMediaContext.Provider
			value={{
				localVideoTrack,
				setMuted,
				setCameraEnabled,
				muted,
				cameraEnabled,
				twilioParticipants
			}}
		>
			<SpaceAudioContext.Provider value={audioContext.current}>{children}</SpaceAudioContext.Provider>
		</SpaceMediaContext.Provider>
	);
}
