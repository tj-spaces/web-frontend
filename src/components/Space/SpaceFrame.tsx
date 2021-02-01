import React, { useContext } from 'react';
import useSpace from '../../hooks/useSpace';
import AuthContext from '../AuthContext';
import Button from '../Base/BaseButton';
import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';
import SpaceContext from './SpaceContext';
import SpaceIDContext from './SpaceIDContext';
import SpaceMediaContext from './SpaceMediaContext';
import SpaceView2D from './SpaceView2D';
import SpaceView3D from './SpaceView3D';
import { spaceViewStyles } from './SpaceViewStyles';

const SPACE_VIEW_TYPE: '2d' | '3d' = '2d';

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

	return (
		<div className={spaceViewStyles.frame}>
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

			{SPACE_VIEW_TYPE === '3d' ? <SpaceView3D /> : <SpaceView2D />}

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
