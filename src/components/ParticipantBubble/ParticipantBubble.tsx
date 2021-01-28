import { useLayoutEffect, useRef } from 'react';
import * as twilio from 'twilio-video';

import './ParticipantBubble.sass';

export default function ParticipantBubble({
	offsetX,
	offsetY,
	photoUrl,
	name,
	videoTrack
}: {
	offsetX: string;
	offsetY: string;
	photoUrl?: string;
	name: string;
	videoTrack: twilio.VideoTrack | null;
}) {
	const initials = name
		.split(' ')
		.filter(Boolean)
		.map((word) => word.slice(0, 1).toUpperCase());

	const videoRef = useRef<HTMLVideoElement>(null);

	// Attach to the video ref after the video is rendered to the screen
	useLayoutEffect(() => {
		if (videoTrack) {
			videoTrack.attach(videoRef.current!);
			videoRef.current!.play();
		}
	}, [videoTrack]);

	return (
		<div className="participant-bubble" style={{ left: offsetX, top: offsetY }}>
			{videoTrack ? <video ref={videoRef} /> : photoUrl ? <img src={photoUrl} alt={name} /> : <h1>{initials}</h1>}
		</div>
	);
}
