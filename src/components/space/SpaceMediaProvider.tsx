import React, {useMemo} from 'react';
import SpaceMediaState from './SpaceMediaState';
import SpaceMediaContext from './SpaceMediaContext';

export default function SpaceMediaProvider({
	children,
	audioContext,
}: {
	children: React.ReactNode;
	audioContext: AudioContext | null;
}) {
	const mediaState: SpaceMediaState = useMemo(
		() =>
			new SpaceMediaState({
				audioContext,
			}),
		[audioContext]
	);

	return (
		<SpaceMediaContext.Provider value={mediaState}>
			{children}
		</SpaceMediaContext.Provider>
	);
}
