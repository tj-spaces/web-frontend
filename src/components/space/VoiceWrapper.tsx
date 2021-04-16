import {useContext, useEffect, useState} from 'react';
import {VoiceServer} from '../../mediautil/MediaConnector';
import AuthContext from '../AuthContext';
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

	useEffect(() => {
		if (voice) {
			if (userMedia) {
				userMedia.getTracks().forEach((track) => {
					voice.addLocalTrack(track, userMedia);
				});

				return () =>
					userMedia.getTracks().forEach((track) => {
						voice.removeLocalTrack(track);
					});
			}
		}
	}, [voice, userMedia]);

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
