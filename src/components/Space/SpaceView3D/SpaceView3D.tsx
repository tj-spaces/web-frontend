import React, { useContext } from 'react';
import useLocalParticipant from '../../../hooks/useLocalParticipant';
import SpaceContext from '../SpaceContext';
import SpaceKeyboardMovementController from '../SpaceKeyboardMovementController';
import SpaceMediaContext from '../SpaceMediaContext';
import SpaceBottomLocalVideo from './SpaceView3DBottomLocalVideo';
import SpaceView3DMinimap from './SpaceView3DMinimap';
import SpaceParticipantRemote3D from './SpaceView3DRemoteParticipant';
import SpatialAudioListener from '../../Media/SpatialAudioListener';
import { spaceViewStyles } from '../SpaceViewStyles';

export default function SpaceView3D() {
	const me = useLocalParticipant();
	const { participants } = useContext(SpaceContext);
	const { twilioParticipants } = useContext(SpaceMediaContext) ?? {};
	const localParticipant = useLocalParticipant();

	if (me == null) {
		return <h1>Joining Space</h1>;
	}

	const perspective = me.position;

	if (perspective == null) {
		return <h1>Waiting to load perspective</h1>;
	}

	return (
		<div style={{ backgroundColor: '#333380' }} className={spaceViewStyles.view}>
			<SpaceKeyboardMovementController />
			{localParticipant && <SpatialAudioListener position={localParticipant.position} />}
			<SpaceView3DMinimap
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
			{localParticipant && <SpaceBottomLocalVideo participant={localParticipant} />}
		</div>
	);
}
