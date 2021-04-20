import {useContext, useMemo} from 'react';
import LocalDevicesContext from './LocalDevicesContext';

export function useUserMediaStream() {
	const {localDevicesState} = useContext(LocalDevicesContext);

	return useMemo(() => localDevicesState.userMedia, [
		localDevicesState.userMedia,
	]);
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

export function useHasLocalVideo() {
	return useContext(
		LocalDevicesContext
	).localDevicesState.hasLocalVideoTracks();
}

export function useHasLocalAudio() {
	return useContext(
		LocalDevicesContext
	).localDevicesState.hasLocalAudioTracks();
}
