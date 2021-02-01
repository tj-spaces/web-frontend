import React, { useContext, useState } from 'react';
import useSpace from '../../hooks/useSpace';
import AuthContext from '../AuthContext';
import Button from '../Base/BaseButton';
import BaseText from '../Base/BaseText';
import SpaceContext from './SpaceContext';
import SpaceIDContext from './SpaceIDContext';
import SpaceMediaContext from './SpaceMediaContext';
import SpaceViewTiles from './SpaceViewTiles/SpaceViewTiles';
import SpaceView3D from './SpaceView3D/SpaceView3D';
import { spaceViewStyles } from './SpaceViewStyles';
import BackgroundColorContext from '../BackgroundColorContext';
import { classes } from '../../styles/createStylesheet';
import SpaceViewLayoutContext from './SpaceViewLayoutContext';

const SPACE_VIEW_TYPE: 'tiles' | '3d' = 'tiles';

export default function SpaceFrame() {
	const spaceID = useContext(SpaceIDContext);
	const space = useSpace(spaceID);
	const mediaContext = useContext(SpaceMediaContext);
	const spaceContext = useContext(SpaceContext);
	const { user } = useContext(AuthContext);
	const [expanded, setExpanded] = useState(true);

	if (user == null) {
		return <h1>Authenticating</h1>;
	}

	if (spaceContext == null) {
		return <h1>Joining Space</h1>;
	}

	return (
		<SpaceViewLayoutContext.Provider value={{ expanded }}>
			<div
				id="frame-container"
				className={classes(
					spaceViewStyles.frame,
					expanded ? spaceViewStyles.frameExpanded : spaceViewStyles.frameCondensed
				)}
			>
				<div className={spaceViewStyles.topHeading} id="top-heading">
					{expanded ? (
						<i className="fas fa-angle-down" onClick={() => setExpanded(false)}></i>
					) : (
						<i className="fas fa-angle-up" onClick={() => setExpanded(true)}></i>
					)}

					<BackgroundColorContext.Provider value="light">
						<BaseText fontSize="xl" fontWeight="bold" alignment="center">
							{space ? space.name : 'Loading Space'}
						</BaseText>
					</BackgroundColorContext.Provider>
				</div>

				<div className={spaceViewStyles.mainContent} id="main-content">
					{SPACE_VIEW_TYPE === '3d' ? <SpaceView3D /> : <SpaceViewTiles />}
				</div>

				<div className={spaceViewStyles.bottomButtons} id="bottom-buttons">
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
		</SpaceViewLayoutContext.Provider>
	);
}
