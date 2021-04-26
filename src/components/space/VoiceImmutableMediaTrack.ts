import immutable from 'immutable';
import {ContentType} from './SignalingChannel';

export type VoiceImmutableMediaTrackProps = {
	contentHint: string;
	contentType?: string;
	enabled: boolean;
	flags: any;
	label: string;
	pausedDownlink: boolean;
	remote: boolean;
	trackID: string;
	userMuted: boolean;
	// webrtcStream?: MediaStream;
	webrtcTrack?: MediaStreamTrack;
};

class VoiceImmutableMediaTrack extends immutable.Record<VoiceImmutableMediaTrackProps>(
	{
		contentHint: '',
		contentType: undefined,
		enabled: false,
		flags: Object.freeze({}),
		label: '',
		pausedDownlink: false,
		remote: false,
		trackID: '',
		userMuted: false,
		// webrtcStream: undefined,
		webrtcTrack: undefined,
	}
) {}

export default VoiceImmutableMediaTrack;

export function createImmutableMediaTrackFromTrack(
	track: MediaStreamTrack,
	contentType: ContentType,
	remote = true
) {
	return new VoiceImmutableMediaTrack({
		webrtcTrack: track,
		contentType,
		remote,
	});
}
