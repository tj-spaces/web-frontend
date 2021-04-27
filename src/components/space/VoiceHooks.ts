import {useContext, useMemo} from 'react';
import VoiceContext from './VoiceContext';

export function useTracks(streamID: string, kind?: 'audio' | 'video') {
	const {voiceState} = useContext(VoiceContext);
	return useMemo(() => {
		const tracks = voiceState.getTracks(streamID);
		if (tracks) {
			if (kind) {
				return tracks.filter((track) => track.kind === kind);
			} else {
				return tracks;
			}
		}
		return [];
	}, [streamID, kind, voiceState]);
}

export function useLocalScreenTracks() {
	return useTracks('@me:screen');
}

export function useLocalUserTracks() {
	return useTracks('@me:user');
}
