import React, { useContext } from 'react';
import { Participant } from 'twilio-video';
import { ISpaceParticipant } from '../../typings/SpaceParticipant';
import AuthContext from '../AuthContext/AuthContext';
import SpaceParticipantRemote from './SpaceParticipantRemote/SpaceParticipantRemote';
import SpacePositionContext from './SpacePositionContext/SpacePositionContext';
import { createStylesheet } from '../../styles/createStylesheet';
import Minimap from './Minimap';

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
	participants: { [id: string]: ISpaceParticipant };
	twilioParticipants: { [id: string]: Participant };
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
					return (
						<SpaceParticipantRemote
							twilioParticipant={twilioParticipants[participant.accountId]!}
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
