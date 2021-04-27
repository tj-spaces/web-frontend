import {useContext, useEffect, useMemo} from 'react';
import useSDKState from '../../hooks/useSDKState';
import getUserMedia from '../../lib/getUserMedia';
import UserSettingsContext from './UserSettingsContext';
import VoiceContext from './VoiceContext';
import VoiceSDK from './VoiceSDK';

export default function VoiceProvider({
	children,
	voiceURL,
}: {
	children: React.ReactNode;
	voiceURL?: string;
}) {
	const voiceSDK = useMemo(() => new VoiceSDK(), []);
	const voiceState = useSDKState(voiceSDK);

	const {
		userSettings: {cameraEnabled, micEnabled},
	} = useContext(UserSettingsContext);

	useEffect(() => {
		if (cameraEnabled) {
			getUserMedia({video: true}).then((tracks) => {
				tracks.forEach((track) => {
					voiceSDK.addLocalUserTrack(track);
				});
			});
		} else {
			voiceSDK.removeLocalUserTracks('video');
		}
	}, [cameraEnabled, voiceSDK]);

	useEffect(() => {
		if (micEnabled) {
			getUserMedia({audio: true}).then((tracks) => {
				tracks.forEach((track) => {
					voiceSDK.addLocalUserTrack(track);
				});
			});
		} else {
			voiceSDK.removeLocalUserTracks('audio');
		}
	}, [micEnabled, voiceSDK]);

	useEffect(() => {
		if (voiceURL) {
			voiceSDK.setVoiceUpstreamUrl(voiceURL);
		}
	}, [voiceSDK, voiceURL]);

	return (
		<VoiceContext.Provider value={{voiceState, voiceSDK}}>
			{children}
		</VoiceContext.Provider>
	);
}
