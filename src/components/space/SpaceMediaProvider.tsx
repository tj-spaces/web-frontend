import React, {useMemo} from 'react';
import SpaceMediaState from './SpaceMediaState';
import SpaceMediaContext from './SpaceMediaContext';
import VoiceEndpoint from './VoiceEndpoint';

export default function SpaceMediaProvider({
	children,
	audioContext,
	voiceServer,
}: {
	children: React.ReactNode;
	audioContext: AudioContext | null;
	voiceServer: VoiceEndpoint | null;
}) {
	const mediaState: SpaceMediaState = useMemo(
		() =>
			new SpaceMediaState({
				audioContext,
				voiceServer,
			}),
		[audioContext, voiceServer]
	);

	return (
		<SpaceMediaContext.Provider value={mediaState}>
			{children}
		</SpaceMediaContext.Provider>
	);
}
