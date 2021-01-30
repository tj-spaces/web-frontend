import React, { useContext } from 'react';
import useLocalParticipant from '../../hooks/useLocalParticipant';
import { createStylesheet } from '../../styles/createStylesheet';
import Minimap from './Minimap';
import SpaceContext from './SpaceContext';
import SpaceMediaContext from './SpaceMediaContext';
import SpaceParticipantRemote from './SpaceParticipantRemote/SpaceParticipantRemote';

export const styles = createStylesheet({
	environment: {
		position: 'relative',
		minHeight: '100vh',
		minWidth: '100%',
		overflow: 'hidden'
	}
});

export default function Environment() {
	const me = useLocalParticipant();
	const { participants } = useContext(SpaceContext);
	const { twilioParticipants } = useContext(SpaceMediaContext) ?? {};

	if (me == null) {
		return <h1>Joining Space</h1>;
	}

	const perspective = me.position;

	if (perspective == null) {
		return <h1>Waiting to load perspective</h1>;
	}

	return (
		<div className={styles.environment} style={{ backgroundColor: '#333380' }}>
			<Minimap
				elements={Object.values(participants).map((participant) => ({
					color: participant.accountId === me?.accountId ? 'blue' : 'red',
					position: participant.position
				}))}
				center={perspective}
			/>
			{Object.values(participants).map((participant) => {
				if (participant.accountId !== me.accountId) {
					const twilioParticipant = twilioParticipants?.[participant.accountId];
					return (
						<SpaceParticipantRemote
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
