export default function transferMediaTracks(
	source: MediaStream,
	destination: MediaStream,
	kind: 'audio' | 'video'
) {
	source.getTracks().forEach((track) => {
		if (track.kind === kind) {
			source.removeTrack(track);
			destination.addTrack(track);
		}
	});
}
