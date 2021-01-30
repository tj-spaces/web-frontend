import { useContext, useLayoutEffect, useRef } from 'react';
import * as twilio from 'twilio-video';
import getCSSTransform from '../../../lib/getCSSTransform';
import { createStylesheet } from '../../../styles/createStylesheet';
import { SpacePositionInfo } from '../../../typings/SpaceParticipant';
import SpacePositionContext from '../SpacePositionContext/SpacePositionContext';

export const styles = createStylesheet({
	participantBubble: {
		borderRadius: '100%',
		width: '8rem',
		height: '8rem',
		transition: 'left 0.5s ease, top 0.5s ease',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'var(--spaces-color-dark-3)',
		textDecoration: 'none',
		color: 'var(--spaces-color-light-0)',
		position: 'relative',
		overflow: 'hidden',
		pseudoSelectors: {
			' video': {
				maxHeight: '100%',
				objectFit: 'cover'
			}
		}
	},
	participantBubbleLocal: {
		transform: 'scaleX(-1)'
	}
});

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
	const transform = isLocal ? {} : getCSSTransform(localPosition!, position);

	return (
		<div className={styles.participantBubble} style={transform}>
			{videoTrack ? <video ref={videoRef} /> : photoUrl ? <img src={photoUrl} alt={name} /> : <h1>{initials}</h1>}
		</div>
	);
}
