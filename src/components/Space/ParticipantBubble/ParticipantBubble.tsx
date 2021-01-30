import { useContext, useLayoutEffect, useRef } from 'react';
import * as twilio from 'twilio-video';
import getCSSTransform from '../../../lib/getCSSTransform';
import { classes, createStylesheet } from '../../../styles/createStylesheet';
import { ISpaceParticipant } from '../../../typings/SpaceParticipant';
import SpacePositionContext from '../SpacePositionContext/SpacePositionContext';

export const styles = createStylesheet({
	participantBubble: {
		borderRadius: '100%',
		width: '8rem',
		height: '8rem',
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
	participantBubbleRemote: {
		top: '50%',
		transition: 'left 0.5s ease, top 0.5s ease, transform 0.5s ease'
	},
	participantBubbleLocal: {
		transform: 'scaleX(-1)'
	}
});

export default function ParticipantBubble({
	participant,
	photoUrl,
	videoTrack,
	isLocal = false
}: {
	participant: ISpaceParticipant;
	photoUrl?: string;
	videoTrack: twilio.VideoTrack | null;
	isLocal?: boolean;
}) {
	const initials = participant.displayName
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

	const perspective = useContext(SpacePositionContext);
	const css = isLocal ? {} : getCSSTransform(perspective!, participant.position);

	return (
		<div
			className={classes(
				styles.participantBubble,
				isLocal ? styles.participantBubbleLocal : styles.participantBubbleRemote
			)}
			style={{ ...css, backgroundColor: participant.displayColor }}
		>
			{videoTrack ? (
				<video ref={videoRef} />
			) : photoUrl ? (
				<img src={photoUrl} alt={participant.displayName} />
			) : (
				<h1>{initials}</h1>
			)}
		</div>
	);
}
