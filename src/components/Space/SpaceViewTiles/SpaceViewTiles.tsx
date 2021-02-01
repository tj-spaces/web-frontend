import React, { useContext } from 'react';
import useLocalParticipant from '../../../hooks/useLocalParticipant';
import useWindowSize from '../../../hooks/useWindowSize';
import getRootFontSize from '../../../lib/getRootFontSize';
import colors from '../../../styles/colors';
import { createStylesheet } from '../../../styles/createStylesheet';
import SpaceContext from '../SpaceContext';
import SpaceMediaContext from '../SpaceMediaContext';
import SpaceViewTilesLocalParticipant from './SpaceViewTilesLocalParticipant';
import SpaceViewTilesTileRow from './SpaceViewTilesTileRow';
import SpaceViewTilesRemoteParticipant from './SpaceViewTilesRemoteParticipant';
import { spaceViewStyles } from '../SpaceViewStyles';

export const styles = createStylesheet({
	screen: {
		extends: [spaceViewStyles.spaceView],
		overflow: 'auto',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	}
});

export default function SpaceViewTiles() {
	const me = useLocalParticipant();
	const { participants } = useContext(SpaceContext);
	const { twilioParticipants } = useContext(SpaceMediaContext) ?? {};

	const windowSize = useWindowSize();
	const rootFontSize = getRootFontSize();
	console.log(rootFontSize);
	const spaceParticipantCircleSize = 20 * rootFontSize; // 10 rem
	const columnGap = 2 * rootFontSize;
	const maxParticipantsPerRow = windowSize.innerWidth / (spaceParticipantCircleSize + columnGap);

	if (me == null) {
		return <h1>Joining Space</h1>;
	}

	let participantElements = [
		<SpaceViewTilesLocalParticipant />,
		<SpaceViewTilesLocalParticipant />,
		<SpaceViewTilesLocalParticipant />,
		<SpaceViewTilesLocalParticipant />,
		<SpaceViewTilesLocalParticipant />,
		<SpaceViewTilesLocalParticipant />,
		<SpaceViewTilesLocalParticipant />,
		...Object.values(participants).map((participant) => {
			const twilioParticipant = twilioParticipants?.[participant.accountId];
			const isLocal = participant.accountId === me.accountId;
			if (!isLocal) {
				return (
					<SpaceViewTilesRemoteParticipant
						twilioParticipant={twilioParticipant ?? null}
						spacesParticipant={participant}
					/>
				);
			} else {
				return null;
			}
		})
	];

	let blocks = [];

	for (let i = 0; i < participantElements.length; i += maxParticipantsPerRow) {
		blocks.push(participantElements.slice(i, i + maxParticipantsPerRow));
	}

	return (
		<div className={styles.screen} style={{ backgroundColor: colors['gray'] }}>
			{blocks.map((block, idx) => {
				return <SpaceViewTilesTileRow participants={block} key={idx} />;
			})}
		</div>
	);
}
