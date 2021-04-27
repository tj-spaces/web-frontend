import immutable from 'immutable';

export type VoiceImmutableMediaTrackProps = {
	kind: 'audio' | 'video';
	enabled: boolean;
	flags: any;
	label: string;
	pausedDownlink: boolean;
	remote: boolean;
	trackID: string;
	streamID: string;
	userMuted: boolean;
	webrtcTrack: MediaStreamTrack;
};

class VoiceImmutableMediaTrack extends immutable.Record<VoiceImmutableMediaTrackProps>(
	{
		kind: 'audio',
		enabled: false,
		flags: Object.freeze({}),
		label: '',
		pausedDownlink: false,
		remote: false,
		streamID: '',
		trackID: '',
		userMuted: false,
		webrtcTrack: null!,
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
		kind: track.kind === 'video' ? 'video' : 'audio',
	});
}
