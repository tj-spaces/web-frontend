import {useContext, useMemo} from 'react';
import LocalDevicesContext from './LocalDevicesContext';

export function useUserMediaStream() {
	const {localDevicesState} = useContext(LocalDevicesContext);

	return useMemo(() => {
		return localDevicesState.userMedia;
	}, [localDevicesState]);
}

export function useLocalTracks(kind?: 'audio' | 'video') {
	const {localDevicesState} = useContext(LocalDevicesContext);

	return useMemo(() => {
		if (kind) {
			if (kind === 'audio') {
				return localDevicesState.getLocalAudioTracks();
			} else {
				return localDevicesState.getLocalVideoTracks();
			}
		} else {
			return localDevicesState.getLocalTracks();
		}
	}, [localDevicesState, kind]);
}