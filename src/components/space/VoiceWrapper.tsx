import {useContext, useEffect, useState} from 'react';
import {VoiceServer} from '../../media/VoiceServer';
import AuthContext from '../AuthContext';
import SpaceMediaContext from './SpaceMediaContext';
import SpaceVoiceContext from './VoiceContext';

export default function VoiceWrapper({
	children,
	spaceID: id,
	voiceURL,
}: {
	children: React.ReactNode;
	spaceID: string;
	voiceURL?: string;
}) {
	const [voice, setVoice] = useState<VoiceServer>();
	const {user} = useContext(AuthContext);
	const {
		localDevices: {cameraEnabled, micEnabled, mediaStream},
	} = useContext(SpaceMediaContext);

	// Enable or disable the microphone
	useEffect(() => {
		if (mediaStream && voice) {
			if (micEnabled) {
				mediaStream.getTracks().forEach((track) => {
					if (track.kind === 'audio') {
						voice.addLocalTrack(track, mediaStream);
					}
				});
			} else {
				mediaStream.getTracks().forEach((track) => {
					if (track.kind === 'audio') {
						voice.removeLocalTrack(track);
					}
				});
			}
		}
	}, [micEnabled, mediaStream, voice]);

	// Enable or disable the camera
	useEffect(() => {
		if (mediaStream && voice) {
			if (cameraEnabled) {
				mediaStream.getTracks().forEach((track) => {
					if (track.kind === 'video') {
						voice.addLocalTrack(track, mediaStream);
					}
				});
			} else {
				mediaStream.getTracks().forEach((track) => {
					if (track.kind === 'video') {
						voice.removeLocalTrack(track);
					}
				});
			}
		}
	}, [cameraEnabled, mediaStream, voice]);

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
		<SpaceVoiceContext.Provider value={voice ?? null}>
			{children}
		</SpaceVoiceContext.Provider>
	);
}
