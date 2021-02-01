import React from 'react';
import { classes, createStylesheet } from '../../styles/createStylesheet';

export const styles = createStylesheet({
	participantBubble: {
		width: '10rem',
		height: '10rem',
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
		marginTop: '-5rem',
		marginRight: '-5rem'
	}
});

export default function SpaceParticipantTile({ children, isLocal }: { children: React.ReactNode; isLocal: boolean }) {
	return (
		<div
			className={classes(
				styles.participantBubble,
				isLocal ? styles.participantBubbleLocal : styles.participantBubbleRemote
			)}
		>
			{children}
		</div>
	);
}
