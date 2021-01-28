import React, { useContext } from 'react';
import { Participant } from 'twilio-video';
import { ISpaceParticipant, SpacePositionInfo } from '../../typings/SpaceParticipant';
import AuthContext from '../AuthContext/AuthContext';
import PositionalDiv from './PositionalDiv';
import SpaceParticipantRemote from './SpaceParticipantRemote/SpaceParticipantRemote';
import SpacePositionContext from './SpacePositionContext/SpacePositionContext';
import './Environment.sass';

export default function Environment({
	participants,
	twilioParticipants
}: {
	participants: { [id: string]: ISpaceParticipant };
	twilioParticipants: { [id: string]: Participant };
}) {
	const { user } = useContext(AuthContext);
	const perspective = useContext(SpacePositionContext);
	let rectPos: SpacePositionInfo = {
		location: { x: 0, y: 0, z: 0 },
		rotation: 0
	};

	if (perspective == null) {
		return <h1>Waiting to load perspective</h1>;
	}

	return (
		<div className="environment" style={{ backgroundColor: '#333380' }}>
			<PositionalDiv perspective={perspective} position={rectPos} className="white-square">
				Hello!
			</PositionalDiv>
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
