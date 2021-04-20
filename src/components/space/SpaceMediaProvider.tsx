import React, {useEffect, useMemo, useState} from 'react';
import {VoiceServerLike} from '../../media/VoiceEndpoint';
import LocalDevicesSDK, {LocalDevicesState} from './LocalDevicesSDK';
import SpaceMediaState from './SpaceMediaState';
import SpaceMediaContext from './SpaceMediaContext';

export default function SpaceMediaProvider({
	children,
	localDevicesSDK,
	audioContext,
	voiceServer,
}: {
	children: React.ReactNode;
	localDevicesSDK: LocalDevicesSDK;
	audioContext: AudioContext | null;
	voiceServer: VoiceServerLike | null;
}) {
	const [localDevicesState, setLocalDevicesState] = useState(
		new LocalDevicesState()
	);

	useEffect(() => {
		const handle = localDevicesSDK.addListener((state) => {
			setLocalDevicesState(state);
		});

		return () => handle.remove();
	}, [localDevicesSDK]);

	const mediaState: SpaceMediaState = useMemo(
		() =>
			new SpaceMediaState({
				localDevicesSDK,
				localDevices: localDevicesState,
				audioContext,
				voiceServer,
			}),
		[audioContext, localDevicesSDK, localDevicesState, voiceServer]
	);

	return (
		<SpaceMediaContext.Provider value={mediaState}>
			{children}
		</SpaceMediaContext.Provider>
	);
}
