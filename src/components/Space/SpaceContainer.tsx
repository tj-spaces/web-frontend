import React, {useContext, useState} from 'react';
import useSpace from '../../hooks/useSpace';
import AuthContext from '../AuthContext';
import BaseButton from '../Base/BaseButton';
import BaseRow from '../Base/BaseRow';
import BaseText from '../Base/BaseText';
import QuestionsModal from './QuestionModal/QuestionModal';
import SpaceIDContext from './SpaceIDContext';
import SpaceMediaContext from './SpaceMediaContext';
import SpaceView3D from './SpaceView3D/SpaceView3D';
import SpaceViewLayoutContext from './SpaceViewLayoutContext';
import {spaceViewStyles} from './SpaceViewStyles';
import SpaceViewTiles from './SpaceViewTiles/SpaceViewTiles';

const SPACE_VIEW_TYPE: 'tiles' | '3d' = '3d';

export default function SpaceContainer() {
	const spaceID = useContext(SpaceIDContext);
	const space = useSpace(spaceID);
	const media = useContext(SpaceMediaContext);
	const {user} = useContext(AuthContext);
	// eslint-disable-next-line
	const [expanded, setExpanded] = useState(true);
	const [questionsModalOpen, setQuestionsModalOpen] = useState(false);

	if (user == null) {
		return <h1>Authenticating</h1>;
	}

	return (
		<SpaceViewLayoutContext.Provider value={{expanded}}>
			<div className={spaceViewStyles('container')}>
				<div className={spaceViewStyles('topHeading')}>
					<BaseText variant="secondary-title" alignment="center">
						{space ? space.topic : 'Loading Space'}
					</BaseText>
				</div>

				<div className={spaceViewStyles('mainContent')}>
					{SPACE_VIEW_TYPE === '3d' ? <SpaceView3D /> : <SpaceViewTiles />}
				</div>

				<BaseRow
					direction="row"
					justifyContent="center"
					alignment="center"
					spacing={1}
					rails={2}
					xstyle={spaceViewStyles.bottomButtons}
				>
					<BaseButton onClick={() => setQuestionsModalOpen(true)}>
						Questions
					</BaseButton>

					{questionsModalOpen && (
						<QuestionsModal onClose={() => setQuestionsModalOpen(false)} />
					)}

					<BaseButton to="..">Leave</BaseButton>

					{media && (
						<>
							{media.muted ? (
								<BaseButton onClick={() => media.setMuted(false)}>
									<i className="fas fa-microphone-slash"></i>
								</BaseButton>
							) : (
								<BaseButton onClick={() => media.setMuted(true)}>
									<i className="fas fa-microphone"></i>
								</BaseButton>
							)}

							{media.cameraEnabled ? (
								<BaseButton onClick={() => media.setCameraEnabled(false)}>
									<i className="fas fa-video"></i>
								</BaseButton>
							) : (
								<BaseButton onClick={() => media.setCameraEnabled(true)}>
									<i className="fas fa-video-slash"></i>
								</BaseButton>
							)}
						</>
					)}
				</BaseRow>
			</div>
		</SpaceViewLayoutContext.Provider>
	);
}
