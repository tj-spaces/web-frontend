import {useContext, useEffect, useMemo} from 'react';
import useSDKState from '../../hooks/useSDKState';
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
		voiceSDK.updateUserMedia({video: cameraEnabled, audio: micEnabled});
	}, [cameraEnabled, micEnabled, voiceSDK]);

	useEffect(() => {
		if (voiceURL) {
			voiceSDK.setVoiceUpstreamUrl(voiceURL);
		}
	}, [voiceSDK, voiceURL]);

	useEffect(() => {
		voiceSDK.removeLocalUserTracks(undefined, true);
	}, [voiceSDK]);

	return (
		<VoiceContext.Provider value={{voiceState, voiceSDK}}>
			{children}
		</VoiceContext.Provider>
	);
}
