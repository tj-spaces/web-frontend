/**
 *
 * @param userMedia The MediaStream received from the getUserMedia function
 */
export default function closeUserMedia(
	userMedia: MediaStream,
	{audio = true, video = true}: {audio: boolean; video: boolean}
) {
	userMedia?.getTracks().forEach((track) => {
		if (
			(audio && track.kind === 'audio') ||
			(video && track.kind === 'video')
		) {
			if (track.readyState !== 'ended') {
				track.stop();
			}
		}
	});
}
