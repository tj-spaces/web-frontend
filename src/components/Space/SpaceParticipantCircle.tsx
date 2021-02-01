import React from 'react';
import { VideoTrack } from 'twilio-video';
import { classes, createStylesheet } from '../../styles/createStylesheet';
import { ISpaceParticipant } from '../../typings/SpaceParticipant';
import TwilioVideoElement from '../TwilioVideoElement';

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
		subSelectors: {
			video: {
				maxHeight: '100%',
				objectFit: 'cover'
			}
		}
	},
	participantBubbleLocal: {
		subSelectors: {
			video: {
				transform: 'scaleX(-1)'
			}
		}
	},
	participantBubbleRemote: {
		marginTop: '-4rem',
		marginRight: '-4rem'
	}
});

export default function SpaceParticipantCircle({
	participant,
	photoUrl,
	videoTrack,
	isLocal
}: {
	participant: ISpaceParticipant;
	photoUrl?: string;
	videoTrack?: VideoTrack | null;
	isLocal: boolean;
}) {
	const initials = participant.displayName
		.split(' ')
		.filter(Boolean)
		.map((word) => word.slice(0, 1).toUpperCase());

	return (
		<div
			className={classes(
				styles.participantBubble,
				isLocal ? styles.participantBubbleLocal : styles.participantBubbleRemote
			)}
			style={{ backgroundColor: participant.displayColor }}
		>
			{videoTrack ? (
				<TwilioVideoElement track={videoTrack} />
			) : photoUrl ? (
				<img src={photoUrl} alt={participant.displayName} />
			) : (
				<h1>{initials}</h1>
			)}
		</div>
	);
}
