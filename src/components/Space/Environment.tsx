import React, { useContext } from 'react';
import { Participant } from 'twilio-video';
import { ISpaceParticipant } from '../../typings/SpaceParticipant';
import AuthContext from '../AuthContext/AuthContext';
import SpaceParticipantRemote from './SpaceParticipantRemote/SpaceParticipantRemote';

export default function Environment({
	participants,
	twilioParticipants
}: {
	participants: { [id: string]: ISpaceParticipant };
	twilioParticipants: { [id: string]: Participant };
}) {
	const { user } = useContext(AuthContext);
	return (
		<div style={{ backgroundColor: '#333380', minHeight: '100vh', minWidth: '100%' }}>
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
