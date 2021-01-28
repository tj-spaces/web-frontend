import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import * as io from 'socket.io-client';
import * as twilio from 'twilio-video';
import useSpace from '../../hooks/useSpace';
import { API_SERVER_URL } from '../../lib/constants';
import getSessionId from '../../lib/getSessionId';
import { ISpaceParticipant } from '../../typings/SpaceParticipant';
import AuthContext from '../AuthContext/AuthContext';
import Button from '../Button/Button';
import CurrentSpaceContext from '../CurrentSpaceContext/CurrentSpaceContext';
import TwilioRoomContext from '../TwilioRoomContext/TwilioRoomContext';
import SpaceAudioContext from '../SpaceAudioContext/SpaceAudioContext';
import SpaceParticipantListing from '../SpaceParticipantListing/SpaceParticipantListing';
import SpaceParticipantLocal from '../SpaceParticipantLocal/SpaceParticipantLocal';
import SpaceParticipantRemote from '../SpaceParticipantRemote/SpaceParticipantRemote';
import Typography from '../Typography/Typography';

export default function Space({ id }: { id: string }) {
	const space = useSpace(id);
	const [participants, setParticipants] = useState<{ [participantId: string]: ISpaceParticipant }>({});
	const [twilioParticipants, setTwilioParticipants] = useState(new Map<string, twilio.RemoteParticipant>());
	const [localTwilioParticipant, setLocalTwilioParticipant] = useState<twilio.LocalParticipant>();
	const [twilioToken, setTwilioToken] = useState<string>();
	const [twilioRoom, setTwilioRoom] = useState<twilio.Room | null>(null);
	const [muted, setMuted_DO_NOT_USE_DIRECTLY] = useState<boolean>(false);
	const [cameraEnabled, setCameraEnabled_DO_NOT_USE_DIRECTLY] = useState<boolean>(true);
	const [localAudioTrack, setLocalAudioTrack] = useState<twilio.LocalAudioTrack | null>(null);
	const [localVideoTrack, setLocalVideoTrack] = useState<twilio.LocalVideoTrack | null>(null);
	const audioContext = useRef(new AudioContext());
	const { user } = useContext(AuthContext);

	// id
	useEffect(() => {
		const connection = io.connect(API_SERVER_URL + '?sessionId=' + getSessionId());
		connection.emit('join_space', id);

		connection.on('twilio_grant', (grant: string) => {
			setTwilioToken(grant);
		});

		connection.on('peers', (peers: { [id: string]: ISpaceParticipant }) => {
			setParticipants(peers);
		});

		connection.on('peer_joined', (peer: ISpaceParticipant) => {
			setParticipants((participants) => ({
				...participants,
				[peer.accountId]: peer
			}));
		});

		connection.on('peer_left', (peerId: string) => {
			setParticipants((participants) => {
				let newParticipants = { ...participants };
				delete newParticipants[peerId];
				return newParticipants;
			});
		});

		return () => {
			connection.emit('leave_space');
			connection.off('peer_joined');
			connection.off('peer_left');
			connection.off('peers');
		};
	}, [id]);

	// twilioToken
	useEffect(() => {
		if (twilioToken) {
			(async () => {
				const audioTrack = await twilio.createLocalAudioTrack();
				const videoTrack = await twilio.createLocalVideoTrack({ width: 640 });

				setLocalAudioTrack(audioTrack);
				setLocalVideoTrack(videoTrack);

				twilio
					.connect(twilioToken, {
						tracks: [audioTrack, videoTrack],
						region: 'us1'
					})
					.then((room) => {
						setTwilioRoom(room);
					});
			})();
		}
	}, [twilioToken]);

	// twilioRoom
	useEffect(() => {
		// We have a Twilio room
		if (twilioRoom) {
			setLocalTwilioParticipant(twilioRoom.localParticipant);

			// Add handlers for twilio connections
			/**
			 * @param participant The Twilio participant that joined
			 * @param _alreadyHere Whether the participant was here when we joined the room and we are adding them to the state via this function
			 */
			const onParticipantConnected = (participant: twilio.RemoteParticipant, _alreadyHere: boolean = false) => {
				let participantId = participant.identity;
				setTwilioParticipants((participants) => {
					participants.set(participantId, participant);
					return participants;
				});
			};
			const onParticipantDisconnected = (participant: twilio.RemoteParticipant) => {
				let participantId = participant.identity;
				setTwilioParticipants((participants) => {
					participants.delete(participantId);
					return participants;
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
				twilioRoom.disconnect();

				// Turn off all video/audio sending when the user leaves the room
				twilioRoom.localParticipant.audioTracks.forEach((track) => {
					track.unpublish();
				});
				twilioRoom.localParticipant.videoTracks.forEach((track) => {
					track.unpublish();
				});
			};
		}
	}, [twilioRoom]);

	const muteSelf = useCallback(() => {
		if (localAudioTrack) {
			localAudioTrack.disable();

			setMuted_DO_NOT_USE_DIRECTLY(true);
		}
	}, [localAudioTrack]);

	const unmuteSelf = useCallback(() => {
		if (localAudioTrack) {
			localAudioTrack.enable();

			setMuted_DO_NOT_USE_DIRECTLY(false);
		}
	}, [localAudioTrack]);

	const enableCamera = useCallback(() => {
		if (localTwilioParticipant) {
			if (!localVideoTrack) {
				(async () => {
					// When enabling the camera, we must get the camera feed again
					let newLocalVideoTrack = await twilio.createLocalVideoTrack({ width: 640 });
					setLocalVideoTrack(newLocalVideoTrack);
					localTwilioParticipant.publishTrack(newLocalVideoTrack);
					setCameraEnabled_DO_NOT_USE_DIRECTLY(true);
				})();
			}
		}
	}, [localTwilioParticipant, localVideoTrack]);

	const disableCamera = useCallback(() => {
		if (localTwilioParticipant) {
			// When disabling the camera, the VideoTrack must be unpublished
			if (localVideoTrack) {
				localVideoTrack.disable();
				setLocalVideoTrack(null);
				localTwilioParticipant.videoTracks.forEach((publication) => {
					publication.unpublish();
				});
			}

			setCameraEnabled_DO_NOT_USE_DIRECTLY(false);
		}
	}, [localTwilioParticipant, localVideoTrack]);

	return (
		<CurrentSpaceContext.Provider value={id}>
			<SpaceAudioContext.Provider value={audioContext.current}>
				<TwilioRoomContext.Provider value={twilioRoom ?? null}>
					{space ? (
						<div style={{ height: '100vh' }} className="flex-column padding-2 position-relative">
							<Typography type="title" alignment="center">
								{space.name}
							</Typography>
							<br />

							<div className="text-center flex-column">
								<h2>Here</h2>
								{Object.values(participants).map((participant) => (
									<SpaceParticipantListing participant={participant} key={participant.accountId} />
								))}
							</div>

							<div className="flex-row margin-y-1 justify-content-center">
								{Object.keys(participants).length && (
									<>
										<SpaceParticipantLocal
											spacesParticipant={participants[user?.id!]}
											localVideoTrack={localVideoTrack}
										/>
										{Object.values(participants).map((participant) => {
											if (participant.accountId !== user?.id) {
												return (
													<SpaceParticipantRemote
														twilioParticipant={
															twilioParticipants.get(participant.accountId)!
														}
														spacesParticipant={participant}
														key={id}
													/>
												);
											} else {
												return null;
											}
										})}
									</>
								)}
							</div>

							<div className="flex-row">
								<Button to=".." className="row-item">
									Leave
								</Button>

								{muted ? (
									<Button onClick={() => unmuteSelf()} className="row-item">
										<i className="fas fa-microphone-slash"></i>
									</Button>
								) : (
									<Button onClick={() => muteSelf()} className="row-item">
										<i className="fas fa-microphone"></i>
									</Button>
								)}

								{cameraEnabled ? (
									<Button onClick={() => disableCamera()} className="row-item">
										<i className="fas fa-video"></i>
									</Button>
								) : (
									<Button onClick={() => enableCamera()} className="row-item">
										<i className="fas fa-video-slash"></i>
									</Button>
								)}
							</div>
						</div>
					) : (
						<span>Loading...</span>
					)}
				</TwilioRoomContext.Provider>
			</SpaceAudioContext.Provider>
		</CurrentSpaceContext.Provider>
	);
}
