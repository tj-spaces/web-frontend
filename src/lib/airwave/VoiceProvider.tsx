import {useContext, useEffect, useMemo} from 'react';
import useSDKState from '../../hooks/useSDKState';
import useControlKeyCommand from '../useControlKeyCommand';
import EnterPreparationModal from '../../components/space/EnterPreparationModal';
import UserSettingsContext from '../../components/space/userSettings/UserSettingsContext';
import VoiceContext from './VoiceContext';
import VoiceSDK from './VoiceSDK';

export default function VoiceProvider({
	children,
	voiceURL,
}: {
	children?: React.ReactNode;
	voiceURL?: string;
}) {
	const voiceSDK = useMemo(() => new VoiceSDK(), []);
	const voiceState = useSDKState(voiceSDK);

	const {userSettings, userSettingsSDK} = useContext(UserSettingsContext);

	const {cameraEnabled, micEnabled} = userSettings;

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

	useControlKeyCommand('r', () => {
		userSettingsSDK.setCameraEnabled(!userSettings.cameraEnabled);
	});

	useControlKeyCommand('f', () => {
		userSettingsSDK.setMicEnabled(!userSettings.micEnabled);
	});

	return (
		<VoiceContext.Provider value={{voiceState, voiceSDK}}>
			{voiceState.ready ? (
				children
			) : (
				<EnterPreparationModal
					onCancel={window.history.back.bind(window.history)}
				/>
			)}
		</VoiceContext.Provider>
	);
}
