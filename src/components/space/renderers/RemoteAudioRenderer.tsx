import {useContext} from 'react';
import SpatialAudioListener from '../../../media/SpatialAudioListener';
import RemoteAudio from './RemoteAudio';
import {
	useMyAnonymousID,
	useMyPosition,
	useParticipants,
} from '../simulation/SimulationHooks';
import VoiceContext from '../airwave/VoiceContext';

export default function SpaceRemoteAudioRoot() {
	const {voiceState} = useContext(VoiceContext);
	const participants = useParticipants();
	const myID = useMyAnonymousID();
	const myPosition = useMyPosition();

	if (!voiceState.ready) {
		return null;
	}

	return (
		<>
			<SpatialAudioListener
				position={myPosition ?? {x: 0, y: 0, z: 0}}
				rotation={0}
			/>

			{Object.entries(participants.toJSON()).map(([id, participant]) =>
				id !== myID ? (
					<RemoteAudio userID={id} position={participant.position} key={id} />
				) : null
			)}
		</>
	);
}
