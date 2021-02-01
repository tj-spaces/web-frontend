import { useRef, useLayoutEffect } from 'react';
import { VideoTrack } from 'twilio-video';

export default function TwilioVideoElement({ track }: { track: VideoTrack }) {
	const ref = useRef<HTMLVideoElement>(null);

	// Attach to the video ref after the video is rendered to the screen
	useLayoutEffect(() => {
		if (track) {
			track.attach(ref.current!);
			ref.current!.play();
		}
	}, [track]);

	return <video ref={ref} />;
}
