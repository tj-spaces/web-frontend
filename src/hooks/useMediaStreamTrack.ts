import { useEffect, useState } from 'react';
import { VideoTrack, AudioTrack } from 'twilio-video';

export default function useMediaStreamTrack(track?: VideoTrack | AudioTrack) {
	const [mediaStreamTrack, setMediaStreamTrack] = useState(track?.mediaStreamTrack);

	useEffect(() => {
		setMediaStreamTrack(track?.mediaStreamTrack);

		if (track) {
			const handleStarted = () => setMediaStreamTrack(track.mediaStreamTrack);
			track.on('started', handleStarted);
			return () => {
				track.off('started', handleStarted);
			};
		}
	}, [track]);

	return mediaStreamTrack;
}
