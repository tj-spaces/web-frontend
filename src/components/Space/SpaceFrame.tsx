import React, { useContext } from 'react';
import useSpace from '../../hooks/useSpace';
import AuthContext from '../AuthContext';
import Button from '../Base/BaseButton';
import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';
import SpaceIDContext from './SpaceIDContext';
import SpaceContext from './SpaceContext';
import SpaceMediaContext from './SpaceMediaContext';
import SpaceBottomLocalVideo from './SpaceBottomLocalVideo';
import SpaceView3D from './SpaceView3D';
import { spaceViewStyles } from './SpaceViewStyles';
import SpatialAudioListener from './SpatialAudioListener';

export default function SpaceFrame() {
	const spaceID = useContext(SpaceIDContext);
	const space = useSpace(spaceID);
	const mediaContext = useContext(SpaceMediaContext);
	const spaceContext = useContext(SpaceContext);
	const { user } = useContext(AuthContext);

	if (user == null) {
		return <h1>Authenticating</h1>;
	}

	if (spaceContext == null) {
		return <h1>Joining Space</h1>;
	}

	const localParticipant = spaceContext.participants[user.id];

	return (
		<div className={spaceViewStyles.frame}>
			{localParticipant && <SpatialAudioListener position={localParticipant.position} />}

			<BaseText fontSize="large" alignment="center">
				{space ? space.name : 'Loading Space'}
			</BaseText>
			<br />

			<BaseRow direction="column">
				<h2>Here</h2>
				{Object.values(spaceContext.participants).map((participant) => (
					<span key={participant.accountId}>{participant.displayName}</span>
				))}
			</BaseRow>

			<SpaceView3D />

			{localParticipant && <SpaceBottomLocalVideo participant={localParticipant} />}

			<div className={spaceViewStyles.bottomButtons}>
				<Button to="..">Leave</Button>

				{mediaContext && (
					<>
						{mediaContext.muted ? (
							<Button onClick={() => mediaContext.setMuted(false)}>
								<i className="fas fa-microphone-slash"></i>
							</Button>
						) : (
							<Button onClick={() => mediaContext.setMuted(true)}>
								<i className="fas fa-microphone"></i>
							</Button>
						)}

						{mediaContext.cameraEnabled ? (
							<Button onClick={() => mediaContext.setCameraEnabled(false)}>
								<i className="fas fa-video"></i>
							</Button>
						) : (
							<Button onClick={() => mediaContext.setCameraEnabled(true)}>
								<i className="fas fa-video-slash"></i>
							</Button>
						)}
					</>
				)}
			</div>
		</div>
	);
}
