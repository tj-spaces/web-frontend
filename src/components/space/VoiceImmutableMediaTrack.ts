import immutable from 'immutable';

export type VoiceImmutableMediaTrackProps = {
	contentHint: string;
	contentType?: string;
	enabled: boolean;
	flags: any;
	label: string;
	pausedDownlink: boolean;
	remote: boolean;
	trackID: string;
	streamID: string;
	userMuted: boolean;
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
		streamID: '',
		trackID: '',
		userMuted: false,
		webrtcTrack: undefined,
	}
) {}

export default VoiceImmutableMediaTrack;

export function createImmutableMediaTrackFromTrack(
	track: MediaStreamTrack,
	streamID: string,
	remote: boolean
) {
	return new VoiceImmutableMediaTrack({
		webrtcTrack: track,
		streamID,
		remote,
	});
}
