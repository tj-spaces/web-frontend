/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import React from 'react';
import {createStylesheet} from '../../../styles/createStylesheet';

export const styles = createStylesheet({
	participantTile: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'var(--bg-elevated)',
		textDecoration: 'none',
		color: 'var(--text-primary)',
		position: 'relative',
		overflow: 'hidden',
		subSelectors: {
			video: {
				maxHeight: '100%',
				objectFit: 'cover',
			},
		},
	},
	participantTileLocal: {
		subSelectors: {
			video: {
				transform: 'scaleX(-1)',
			},
		},
	},
	participantTileRemote: {
		marginTop: '-50%',
		marginRight: '-50%',
	},
	participantTileCondensed: {
		width: '7.5rem',
		height: '7.5rem',
	},
	participantTileExpanded: {
		width: '10rem',
		height: '10rem',
	},
});

export default function Tile({
	children,
	isLocal,
}: {
	children: React.ReactNode;
	isLocal: boolean;
}) {
	return (
		<div
			className={styles(
				'participantTile',
				isLocal ? 'participantTileLocal' : 'participantTileRemote',
				true ? 'participantTileExpanded' : 'participantTileCondensed'
			)}
		>
			{children}
		</div>
	);
}
