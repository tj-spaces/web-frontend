import React, {useContext, useEffect, useMemo, useState} from 'react';
import getUserMedia from '../../lib/getUserMedia';
import LocalDevicesContext from './LocalDevicesContext';
import LocalDevicesSDK, {LocalDevicesState} from './LocalDevicesSDK';
import UserSettingsContext from './UserSettingsContext';

export default function LocalDevicesProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const sdk = useMemo(() => new LocalDevicesSDK(), []);
	const [state, setState] = useState(new LocalDevicesState());

	useEffect(() => {
		let handle = sdk.addListener(setState);
		return () => handle.remove();
	}, [sdk]);

	const {
		userSettings: {cameraEnabled, micEnabled},
	} = useContext(UserSettingsContext);

	useEffect(() => {
		if (!cameraEnabled) {
			sdk.stopLocalTracks('video');
		} else {
			if (!sdk.hasLocalVideoTracks()) {
				getUserMedia(
					{video: true},
					(media) => {
						if (sdk.hasLocalAudioTracks()) {
							sdk.transferLocalTracksFromStream(media, 'video');
						} else {
							sdk.setMediaStream(media);
						}
					},
					(error) => {}
				);
			}
		}
	}, [cameraEnabled, sdk]);

	useEffect(() => {
		if (!micEnabled) {
			sdk.stopLocalTracks('audio');
		} else {
			if (!sdk.hasLocalAudioTracks()) {
				getUserMedia(
					{audio: true},
					(media) => {
						if (sdk.hasLocalVideoTracks()) {
							sdk.transferLocalTracksFromStream(media, 'audio');
						} else {
							sdk.setMediaStream(media);
						}
					},
					(error) => {}
				);
			}
		}
	}, [micEnabled, sdk]);

	return (
		<LocalDevicesContext.Provider
			value={{localDevicesState: state, localDevicesSDK: sdk}}
		>
			{children}
		</LocalDevicesContext.Provider>
	);
}
