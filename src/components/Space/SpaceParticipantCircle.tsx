import React from 'react';
import { createStylesheet } from '../../styles/createStylesheet';

export const styles = createStylesheet({
	participantBubble: {
		borderRadius: '100%',
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
		marginTop: '-4rem',
		marginRight: '-4rem'
	}
});

export default function SpaceParticipantCircle({ children, isLocal }: { children: React.ReactNode; isLocal: boolean }) {
	return (
		<div className={styles('participantBubble', isLocal ? 'participantBubbleLocal' : 'participantBubbleRemote')}>
			{children}
		</div>
	);
}
