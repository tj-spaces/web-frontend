import React, {useContext, useRef} from 'react';
import useLocalParticipant from '../../../hooks/useLocalParticipant';
import SpaceParticipantsContext from '../SpaceParticipantsContext';
import SpaceMediaContext from '../SpaceMediaContext';
import SpaceBottomLocalVideo from './SpaceView3DBottomLocalVideo';
import SpaceView3DMinimap from './SpaceView3DMinimap';
import SpaceParticipantRemote3D from './SpaceView3DRemoteParticipant';
import SpatialAudioListener from '../../../mediautil/SpatialAudioListener';
import {spaceViewStyles} from '../SpaceViewStyles';

export default function SpaceView3D() {
	const me = useLocalParticipant();
	const participants = useContext(SpaceParticipantsContext);
	const {twilioParticipants} = useContext(SpaceMediaContext) ?? {};
	const localParticipant = useLocalParticipant();
	const environmentRef = useRef<HTMLDivElement>(null);

	if (me == null) {
		return <h1>Joining Space</h1>;
	}

	const perspective = me.position;

	if (perspective == null) {
		return <h1>Waiting to load perspective</h1>;
	}

	return (
		<div
			style={{backgroundColor: '#333380'}}
			className={spaceViewStyles('environment')}
			ref={environmentRef}
			// This is needed so we can listen for keyboard events
			tabIndex={0}
		>
			{localParticipant && (
				<SpatialAudioListener
					position={localParticipant.position}
					rotation={localParticipant.rotation}
				/>
			)}
			<SpaceView3DMinimap
				elements={Object.values(participants).map((participant) => ({
					color: participant.id === me?.id ? 'blue' : 'red',
					position: participant.position,
					rotation: participant.rotation,
				}))}
				center={perspective}
			/>
			{Object.values(participants).map((participant) => {
				if (participant.id !== me.id) {
					const twilioParticipant = twilioParticipants?.[participant.id];
					return (
						<SpaceParticipantRemote3D
							twilioParticipant={twilioParticipant ?? null}
							spacesParticipant={participant}
							key={participant.id}
						/>
					);
				} else {
					return null;
				}
			})}
			{localParticipant && (
				<SpaceBottomLocalVideo participant={localParticipant} />
			)}
		</div>
	);
}
