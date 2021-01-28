import { useContext, useLayoutEffect, useRef } from 'react';
import * as twilio from 'twilio-video';
import getCSSTransform from '../../../lib/getCSSTransform';
import { SpacePositionInfo } from '../../../typings/SpaceParticipant';
import SpacePositionContext from '../SpacePositionContext/SpacePositionContext';

import './ParticipantBubble.sass';

export default function ParticipantBubble({
	position,
	photoUrl,
	name,
	videoTrack,
	isLocal = false
}: {
	position: SpacePositionInfo;
	photoUrl?: string;
	name: string;
	videoTrack: twilio.VideoTrack | null;
	isLocal?: boolean;
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

	const localPosition = useContext(SpacePositionContext);
	const transform = isLocal ? undefined : getCSSTransform(localPosition!, position);
	const className = 'participant-bubble'; // + isLocal ? ' participant-bubble-local' : '';

	return (
		<div className={className} style={{ transform }}>
			{videoTrack ? <video ref={videoRef} /> : photoUrl ? <img src={photoUrl} alt={name} /> : <h1>{initials}</h1>}
		</div>
	);
}
