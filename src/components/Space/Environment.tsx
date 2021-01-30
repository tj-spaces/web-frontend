import React, { useContext } from 'react';
import { Participant } from 'twilio-video';
import { createStylesheet } from '../../styles/createStylesheet';
import { ISpaceParticipant } from '../../typings/SpaceParticipant';
import AuthContext from '../AuthContext/AuthContext';
import Minimap from './Minimap';
import SpaceParticipantRemote from './SpaceParticipantRemote/SpaceParticipantRemote';
import SpacePositionContext from './SpacePositionContext/SpacePositionContext';

export const styles = createStylesheet({
	environment: {
		position: 'relative',
		minHeight: '100vh',
		minWidth: '100%',
		overflow: 'hidden'
	}
});

export default function Environment({
	participants,
	twilioParticipants
}: {
	participants: Record<string, ISpaceParticipant>;
	twilioParticipants?: Record<string, Participant>;
}) {
	const { user } = useContext(AuthContext);
	const perspective = useContext(SpacePositionContext);

	if (perspective == null) {
		return <h1>Waiting to load perspective</h1>;
	}

	return (
		<div className={styles.environment} style={{ backgroundColor: '#333380' }}>
			<Minimap
				elements={Object.values(participants).map((participant) => {
					return {
						color: participant.accountId === user!.id ? 'blue' : 'red',
						position: participant.position
					};
				})}
				center={perspective}
			/>
			{Object.values(participants).map((participant) => {
				if (participant.accountId !== user!.id) {
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
