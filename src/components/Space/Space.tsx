import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import * as io from 'socket.io-client';
import * as twilio from 'twilio-video';
import useSpace from '../../hooks/useSpace';
import { API_SERVER_URL } from '../../lib/constants';
import getSessionId from '../../lib/getSessionId';
import { ISpaceParticipant } from '../../typings/SpaceParticipant';
import AuthContext from '../AuthContext/AuthContext';
import Button from '../BaseButton/BaseButton';
import CurrentSpaceContext from './CurrentSpaceContext';
import TwilioRoomContext from '../TwilioRoomContext/TwilioRoomContext';
import SpaceAudioContext from './SpaceAudioContext/SpaceAudioContext';
import SpaceParticipantListing from './SpaceParticipantListing/SpaceParticipantListing';
import SpaceParticipantLocal from './SpaceParticipantLocal/SpaceParticipantLocal';
import BaseText from '../BaseText/BaseText';
import useKeyboardState from '../../hooks/useKeyboardState';
import SpacePositionContext from './SpacePositionContext/SpacePositionContext';
import Environment from './Environment';
import BaseRow from '../BaseRow/BaseRow';
import spacesLog from '../../lib/spacesLog';
import { deepMutateObject, NestedPartial } from '../../lib/deepMutateObject';

let useTwilio = true;

export default function Space({ id }: { id: string }) {
	const space = useSpace(id);
	const [participants, setParticipants] = useState<{ [participantId: string]: ISpaceParticipant }>({});
	const [twilioParticipants, setTwilioParticipants] = useState<{ [participantId: string]: twilio.RemoteParticipant }>(
		{}
	);
	const [twilioRoom, setTwilioRoom] = useState<twilio.Room | null>(null);
	const [muted, setMuted] = useState<boolean>(false);
	const [cameraEnabled, setCameraEnabled] = useState<boolean>(true);
	const [localVideoTrack, setLocalVideoTrack] = useState<twilio.LocalVideoTrack | null>(null);
	const audioContext = useRef(new AudioContext());
	// Guaranteed to have a value
	const user = useContext(AuthContext).user!;
	const connectionRef = useRef<SocketIOClient.Socket | null>(null);

	// id
	// this sets up the socket.io connection and twilio grant
	useEffect(() => {
		if (!connectionRef.current) {
			connectionRef.current = io.connect(API_SERVER_URL + '?sessionId=' + getSessionId());
		}

		connectionRef.current.emit('join_space', id);

		connectionRef.current.on('twilio_grant', (grant: string) => {
			if (useTwilio) {
				twilio.connect(grant, { region: 'us1' }).then((room) => {
					setTwilioRoom(room);
				});
			}
		});

		connectionRef.current.on('peers', (peers: { [id: string]: ISpaceParticipant }) => {
			spacesLog('space-rt', `Received peer list: ${Object.keys(peers).length} peers`);
			setParticipants(peers);
		});

		connectionRef.current.on('peer_joined', (peer: ISpaceParticipant) => {
			spacesLog('space-rt', `Peer joined: ${peer.accountId}`);
			setParticipants((participants) => ({
				...participants,
				[peer.accountId]: peer
			}));
		});

		connectionRef.current.on('peer_left', (peerId: string) => {
			spacesLog('space-rt', `Peer left: ${peerId}`);
			setParticipants((participants) => {
				let newParticipants = { ...participants };
				delete newParticipants[peerId];
				return newParticipants;
			});
		});

		connectionRef.current.on('peer_update', (peerId: string, updates: NestedPartial<ISpaceParticipant>) => {
			setParticipants((participants) => ({
				...participants,
				[peerId]: deepMutateObject(participants[peerId], updates)
			}));
		});

		return () => {
			if (connectionRef.current) {
				connectionRef.current.emit('leave_space');
				connectionRef.current.disconnect();
				connectionRef.current = null;
			}
		};
	}, [id]);

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
				let participantId = participant.identity;
				setTwilioParticipants((participants) => {
					return { ...participants, [participantId]: participant };
				});
			};
			const onParticipantDisconnected = (participant: twilio.RemoteParticipant) => {
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

	const keyboardState = useKeyboardState();

	useEffect(() => {
		if (keyboardState.a) {
			connectionRef.current?.emit('set_rotate_direction', -1);
		} else if (keyboardState.d) {
			connectionRef.current?.emit('set_rotate_direction', 1);
		} else {
			connectionRef.current?.emit('set_rotate_direction', 0);
		}

		if (keyboardState.w) {
			connectionRef.current?.emit('set_walk_direction', 1);
		} else if (keyboardState.s) {
			connectionRef.current?.emit('set_walk_direction', -1);
		} else {
			connectionRef.current?.emit('set_walk_direction', 0);
		}
	}, [keyboardState]);

	const userLoaded = participants[user.id] != null;

	if (!userLoaded) {
		return <h1>Waiting for connection</h1>;
	}

	return (
		<CurrentSpaceContext.Provider value={id}>
			<SpaceAudioContext.Provider value={audioContext.current}>
				<SpacePositionContext.Provider value={participants[user.id].position}>
					<TwilioRoomContext.Provider value={twilioRoom ?? null}>
						{space ? (
							<BaseRow direction="column">
								<BaseText fontSize="large" alignment="center">
									{space.name}
								</BaseText>
								<br />

								<BaseRow direction="column">
									<h2>Here</h2>
									{Object.values(participants).map((participant) => (
										<SpaceParticipantListing
											participant={participant}
											key={participant.accountId}
										/>
									))}
								</BaseRow>

								<Environment participants={participants} twilioParticipants={twilioParticipants} />

								{user && (
									<SpaceParticipantLocal
										spacesParticipant={participants[user!.id]}
										localVideoTrack={localVideoTrack}
									/>
								)}
								<BaseRow direction="row" spacing={1} rails={1} justifyContent="center">
									<Button to="..">Leave</Button>

									{muted ? (
										<Button onClick={() => setMuted(false)}>
											<i className="fas fa-microphone-slash"></i>
										</Button>
									) : (
										<Button onClick={() => setMuted(true)}>
											<i className="fas fa-microphone"></i>
										</Button>
									)}

									{cameraEnabled ? (
										<Button onClick={() => setCameraEnabled(false)}>
											<i className="fas fa-video"></i>
										</Button>
									) : (
										<Button onClick={() => setCameraEnabled(true)}>
											<i className="fas fa-video-slash"></i>
										</Button>
									)}
								</BaseRow>
							</BaseRow>
						) : (
							<span>Loading...</span>
						)}
					</TwilioRoomContext.Provider>
				</SpacePositionContext.Provider>
			</SpaceAudioContext.Provider>
		</CurrentSpaceContext.Provider>
	);
}
