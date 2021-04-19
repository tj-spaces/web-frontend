import React, {useEffect, useMemo, useState} from 'react';
import {VoiceServerLike} from '../../media/VoiceServer';
import LocalDevicesSDK, {LocalDevicesState} from './LocalDevicesSDK';
import SpaceMediaState from './SpaceMediaState';
import SpaceMediaContext from './SpaceMediaContext';

export default function SpaceMediaStateProvider({
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
				localDevices: localDevicesState,
				audioContext,
				voiceServer,
			}),
		[audioContext, localDevicesState, voiceServer]
	);

	return (
		<SpaceMediaContext.Provider value={mediaState}>
			{children}
		</SpaceMediaContext.Provider>
	);
}
