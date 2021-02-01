import React, { useContext } from 'react';
import { classes, createStylesheet } from '../../styles/createStylesheet';
import SpaceViewLayoutContext from './SpaceViewLayoutContext';

export const styles = createStylesheet({
	participantTile: {
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
	participantTileLocal: {
		subSelectors: {
			video: {
				transform: 'scaleX(-1)'
			}
		}
	},
	participantTileRemote: {
		marginTop: '-50%',
		marginRight: '-50%'
	},
	participantTileCondensed: {
		width: '7.5rem',
		height: '7.5rem'
	},
	participantTileExpanded: {
		width: '10rem',
		height: '10rem'
	}
});

export default function SpaceParticipantTile({ children, isLocal }: { children: React.ReactNode; isLocal: boolean }) {
	const layout = useContext(SpaceViewLayoutContext);

	return (
		<div
			className={classes(
				styles.participantTile,
				isLocal ? styles.participantTileLocal : styles.participantTileRemote,
				layout.expanded ? styles.participantTileExpanded : styles.participantTileCondensed
			)}
		>
			{children}
		</div>
	);
}
