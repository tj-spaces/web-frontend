import {useContext, useEffect, useState} from 'react';
import {VoiceServer} from '../../media/VoiceServer';
import AuthContext from '../AuthContext';
import DeviceControlContext from './DeviceControlContext';
import LocalWebcamContext from './LocalWebcamContext';
import SpaceVoiceContext from './VoiceContext';

export default function VoiceWrapper({
	children,
	spaceID: id,
	userMedia,
	voiceURL,
}: {
	children: React.ReactNode;
	spaceID: string;
	userMedia: MediaStream | null;
	voiceURL?: string;
}) {
	const [voice, setVoice] = useState<VoiceServer>();
	const {user} = useContext(AuthContext);
	const {cameraEnabled, micEnabled} = useContext(DeviceControlContext);

	// Enable or disable the microphone
	useEffect(() => {
		if (userMedia && voice) {
			if (micEnabled) {
				userMedia.getTracks().forEach((track) => {
					if (track.kind === 'audio') {
						voice.addLocalTrack(track, userMedia);
					}
				});
			} else {
				userMedia.getTracks().forEach((track) => {
					if (track.kind === 'audio') {
						voice.removeLocalTrack(track);
					}
				});
			}
		}
	}, [micEnabled, userMedia, voice]);

	// Enable or disable the camera
	useEffect(() => {
		if (userMedia && voice) {
			if (cameraEnabled) {
				userMedia.getTracks().forEach((track) => {
					if (track.kind === 'video') {
						voice.addLocalTrack(track, userMedia);
					}
				});
			} else {
				userMedia.getTracks().forEach((track) => {
					if (track.kind === 'video') {
						voice.removeLocalTrack(track);
					}
				});
			}
		}
	}, [cameraEnabled, userMedia, voice]);

	useEffect(() => {
		if (user?.id && voiceURL) {
			let voice = new VoiceServer(voiceURL, user.id);
			setVoice(voice);
			return () => {
				voice.disconnect();
			};
		}
	}, [voiceURL, user?.id]);

	useEffect(() => {
		if (voice) {
			voice.joinRoom(id);
			return () => {
				// TODO: Add room leaving code
			};
		}
	}, [id, voice]);

	useEffect(() => {
		if (voice) {
			return () => voice.disconnect();
		}
	}, [voice]);

	return (
		<LocalWebcamContext.Provider value={userMedia}>
			<SpaceVoiceContext.Provider value={voice ?? null}>
				{children}
			</SpaceVoiceContext.Provider>
		</LocalWebcamContext.Provider>
	);
}
