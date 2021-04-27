import {useContext} from 'react';
import {ContentType} from './SignalingChannel';
import VoiceContext from './VoiceContext';

export function useUserTracks(userID: string, contentType: ContentType) {
	const {voiceState} = useContext(VoiceContext);
	const userTracks = voiceState.getUserTracks(userID);
	if (userTracks) {
		if (contentType) {
			return userTracks.filter((track) => track.contentType === contentType);
		} else {
			return userTracks;
		}
	}
	return [];
}
