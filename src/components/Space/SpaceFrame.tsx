import React, { useContext } from 'react';
import useSpace from '../../hooks/useSpace';
import AuthContext from '../AuthContext/AuthContext';
import Button from '../BaseButton/BaseButton';
import BaseRow from '../BaseRow/BaseRow';
import BaseText from '../BaseText/BaseText';
import CurrentSpaceContext from './CurrentSpaceContext';
import Environment from './Environment';
import SpaceContext from './SpaceContext';
import SpaceMediaContext from './SpaceMediaContext';
import SpaceParticipantListing from './SpaceParticipantListing/SpaceParticipantListing';
import SpaceParticipantLocal from './SpaceParticipantLocal/SpaceParticipantLocal';

export default function SpaceFrame() {
	const spaceID = useContext(CurrentSpaceContext);
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

	const userLoaded = spaceContext.participants[user.id] != null;

	return (
		<BaseRow direction="column">
			<BaseText fontSize="large" alignment="center">
				{space ? space.name : 'Loading Space'}
			</BaseText>
			<br />

			<BaseRow direction="column">
				<h2>Here</h2>
				{Object.values(spaceContext.participants).map((participant) => (
					<SpaceParticipantListing participant={participant} key={participant.accountId} />
				))}
			</BaseRow>

			<Environment />

			{userLoaded && <SpaceParticipantLocal spacesParticipant={spaceContext.participants[user.id]} />}
			<BaseRow direction="row" spacing={1} rails={1} justifyContent="center">
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
			</BaseRow>
		</BaseRow>
	);
}
