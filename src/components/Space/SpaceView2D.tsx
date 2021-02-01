import React, { useContext } from 'react';
import useLocalParticipant from '../../hooks/useLocalParticipant';
import useWindowSize from '../../hooks/useWindowSize';
import getRootFontSize from '../../lib/getRootFontSize';
import { createStylesheet } from '../../styles/createStylesheet';
import BaseRow from '../Base/BaseRow';
import SpaceContext from './SpaceContext';
import SpaceMediaContext from './SpaceMediaContext';
import SpaceView2DLocalParticipant from './SpaceView2DLocalParticipant';
import SpaceView2DParticipantRow from './SpaceView2DParticipantRow';
import SpaceView2DRemoteParticipant from './SpaceView2DRemoteParticipant';

export const styles = createStylesheet({
	screen: {
		position: 'relative',
		minHeight: '100vh',
		minWidth: '100%',
		overflow: 'auto',
		display: 'grid',
		columnGap: '2rem',
		rowGap: '2rem',
		gridTemplateColumns: 'repeat(auto-fit, minmax(11em, 1fr))',
		alignItems: 'center',
		justifyItems: 'center'
	}
});

export default function SpaceView2D() {
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
		<SpaceView2DLocalParticipant />,
		<SpaceView2DLocalParticipant />,
		<SpaceView2DLocalParticipant />,
		<SpaceView2DLocalParticipant />,
		<SpaceView2DLocalParticipant />,
		<SpaceView2DLocalParticipant />,
		<SpaceView2DLocalParticipant />,
		...Object.values(participants).map((participant) => {
			const twilioParticipant = twilioParticipants?.[participant.accountId];
			const isLocal = participant.accountId === me.accountId;
			if (!isLocal) {
				return (
					<SpaceView2DRemoteParticipant
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
		<div className={styles.screen} style={{ backgroundColor: 'gray' }}>
			<BaseRow direction="column">
				{blocks.map((block, idx) => {
					return <SpaceView2DParticipantRow participants={block} key={idx} />;
				})}
			</BaseRow>
		</div>
	);
}
