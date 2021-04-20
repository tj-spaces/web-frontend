import {useEffect, useMemo, useState} from 'react';
import SpaceVoiceContext from './VoiceContext';
import VoiceSDK from './VoiceSDK';
import {VoiceState} from './VoiceState';

export default function VoiceProvider({
	children,
	spaceID,
	voiceURL,
}: {
	children: React.ReactNode;
	spaceID: string;
	voiceURL?: string;
}) {
	const voiceSDK = useMemo(() => new VoiceSDK(), []);
	const [voiceState, setVoiceState] = useState(new VoiceState());

	// Listen to changes to the voice state from the SDK
	useEffect(() => {
		const handle = voiceSDK.addListener(setVoiceState);
		return () => handle.remove();
	}, [voiceSDK]);

	useEffect(() => {
		//
	}, [voiceSDK, spaceID]);

	// TODO: add adding/removing local tracks
	// TODO: add joining room

	return (
		<SpaceVoiceContext.Provider value={voiceState}>
			{children}
		</SpaceVoiceContext.Provider>
	);
}
