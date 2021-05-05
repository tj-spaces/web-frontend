import VoiceImmutableMediaTrack, {
	createImmutableMediaTrackFromTrack,
} from '../components/space/VoiceImmutableMediaTrack';

// Check if it's possible to getUserMedia. This will be undefined if it's not possible
const nativeGetUserMedia =
	navigator.getUserMedia?.bind(navigator) ||
	navigator.mediaDevices.getUserMedia?.bind(navigator.mediaDevices);

function getUserMedia(constraints: MediaStreamConstraints) {
	return new Promise<VoiceImmutableMediaTrack[]>((resolve, reject) =>
		nativeGetUserMedia(
			constraints,
			(stream) => {
				resolve(
					stream
						.getTracks()
						.map((track) =>
							createImmutableMediaTrackFromTrack(track, '@me:user', false)
						)
				);
			},
			reject
		)
	);
}

export default getUserMedia;
