import {useContext, useDebugValue, useMemo} from 'react';
import VoiceContext from './VoiceContext';

export function useUserStreams(userID: string) {
	const {voiceState} = useContext(VoiceContext);

	const userStreams = useMemo(() => {
		return voiceState.getUserStreams(userID);
	}, [userID, voiceState]);

	useDebugValue(userStreams);

	return userStreams;
}

export function useUserTracks(userID: string, kind?: 'audio' | 'video') {
	const {voiceState} = useContext(VoiceContext);
	const userTracks = voiceState.getUserTracks(userID);
	if (userTracks) {
		if (kind) {
			return userTracks.filter((track) => track.kind === kind);
		} else {
			return userTracks;
		}
	}
	return [];
}
