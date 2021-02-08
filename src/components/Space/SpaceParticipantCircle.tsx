import React from 'react';
import colors from '../../styles/colors';
import {createStylesheet} from '../../styles/createStylesheet';

export const styles = createStylesheet({
	participantBubble: {
		borderRadius: '100%',
		width: '10rem',
		height: '10rem',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.bgElevated,
		textDecoration: 'none',
		color: colors.textSecondary,
		position: 'relative',
		overflow: 'hidden',
		subSelectors: {
			video: {
				maxHeight: '100%',
				objectFit: 'cover',
			},
		},
	},
	participantBubbleLocal: {
		subSelectors: {
			video: {
				// Mirror our video
				transform: 'scaleX(-1)',
			},
		},
	},
	participantBubbleRemote: {
		// Center the participant
		marginTop: '-4rem',
		marginRight: '-4rem',
	},
});

type Props = {
	children: React.ReactNode;
	isLocal: boolean;
};

export default function SpaceParticipantCircle({children, isLocal}: Props) {
	return (
		<div
			className={styles(
				'participantBubble',
				isLocal ? 'participantBubbleLocal' : 'participantBubbleRemote'
			)}
		>
			{children}
		</div>
	);
}
