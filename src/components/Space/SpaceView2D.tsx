import React, { useContext } from 'react';
import useLocalParticipant from '../../hooks/useLocalParticipant';
import { createStylesheet } from '../../styles/createStylesheet';
import SpaceContext from './SpaceContext';
import SpaceMediaContext from './SpaceMediaContext';
import SpaceParticipantRemote3D from './SpaceParticipantRemote3D';

export const styles = createStylesheet({
	screen: {
		position: 'relative',
		minHeight: '100vh',
		minWidth: '100%',
		overflow: 'hidden'
	}
});

export default function SpaceView3D() {
	const me = useLocalParticipant();
	const { participants } = useContext(SpaceContext);
	const { twilioParticipants } = useContext(SpaceMediaContext) ?? {};

	if (me == null) {
		return <h1>Joining Space</h1>;
	}

	return (
		<div className={styles.screen} style={{ backgroundColor: '#333380' }}>
			{Object.values(participants).map((participant) => {
				if (participant.accountId !== me.accountId) {
					const twilioParticipant = twilioParticipants?.[participant.accountId];
					return (
						<SpaceParticipantRemote3D
							twilioParticipant={twilioParticipant ?? null}
							spacesParticipant={participant}
							key={participant.accountId}
						/>
					);
				} else {
					return null;
				}
			})}
		</div>
	);
}
