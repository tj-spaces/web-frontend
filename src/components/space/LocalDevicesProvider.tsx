import React, {useContext, useEffect, useMemo, useState} from 'react';
import getUserMedia from '../../lib/getUserMedia';
import LocalDevicesContext from './LocalDevicesContext';
import LocalDevicesSDK from './LocalDevicesSDK';
import LocalDevicesState from './LocalDevicesState';
import UserSettingsContext from './UserSettingsContext';

export default function LocalDevicesProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const sdk = useMemo(() => new LocalDevicesSDK(), []);
	const [state, setState] = useState(new LocalDevicesState());

	useEffect(() => {
		return () => {
			sdk.closeMediaStream();
		};
	}, [sdk]);

	useEffect(() => {
		let handle = sdk.addListener(setState);
		return () => handle.remove();
	}, [sdk]);

	const {
		userSettings: {cameraEnabled, micEnabled},
	} = useContext(UserSettingsContext);

	useEffect(() => {
		if (!cameraEnabled) {
			if (state.hasLocalVideoTracks()) {
				sdk.stopLocalTracks('video');
			}
		} else {
			if (!state.hasLocalVideoTracks()) {
				getUserMedia({video: true})
					.then((media) => {
						if (state.hasLocalAudioTracks()) {
							sdk.transferLocalTracksFromStream(media, 'video');
						} else {
							sdk.setUserMedia(media);
						}
					})
					.catch((error) => {
						console.error({event: 'getUserMedia', error});
					});
			}
		}
	}, [cameraEnabled, sdk, state]);

	useEffect(() => {
		if (!micEnabled) {
			if (state.hasLocalAudioTracks()) {
				sdk.stopLocalTracks('audio');
			}
		} else {
			if (!state.hasLocalAudioTracks()) {
				getUserMedia({audio: true})
					.then((media) => {
						if (state.hasLocalVideoTracks()) {
							sdk.transferLocalTracksFromStream(media, 'audio');
						} else {
							sdk.setUserMedia(media);
						}
					})
					.catch((error) => {
						console.error({event: 'getUserMedia', error});
					});
			}
		}
	}, [micEnabled, sdk, state]);

	return (
		<LocalDevicesContext.Provider
			value={{localDevicesState: state, localDevicesSDK: sdk}}
		>
			{children}
		</LocalDevicesContext.Provider>
	);
}
