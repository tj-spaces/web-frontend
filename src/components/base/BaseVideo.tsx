import {useRef, useLayoutEffect} from 'react';

export default function BaseVideo({track}: {track: MediaStreamTrack}) {
	const ref = useRef<HTMLVideoElement>(null);

	// Attach to the video ref after the video is rendered to the screen
	useLayoutEffect(() => {
		if (track) {
			if (ref.current) {
				ref.current.srcObject = new MediaStream([track]);
				ref.current.play();
			}
		}
	}, [track]);

	return <video ref={ref} />;
}
