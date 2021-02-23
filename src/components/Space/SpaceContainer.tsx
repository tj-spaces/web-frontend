import React, {useContext, useState} from 'react';
import {useSpace} from '../../api/spaces';
import AuthContext from '../AuthContext';
import BaseButton from '../base/BaseButton';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import ChatModal from './chatModal/ChatModal';
import SpaceDeviceControlButtons from './SpaceDeviceControlButtons';
import CurrentSpaceContext from './SpaceIDContext';
import SpaceView3D from './spaceView3D/SpaceView3D';
import {spaceViewStyles} from './SpaceViewStyles';
import SpaceViewTiles from './spaceViewTiles/SpaceViewTiles';

const SPACE_VIEW_TYPE: 'tiles' | '3d' = '3d';

export default function SpaceContainer() {
	const spaceID = useContext(CurrentSpaceContext)!;
	const space = useSpace(spaceID);
	const {user} = useContext(AuthContext);
	const [chatModalOpen, setChatModalOpen] = useState(false);

	if (user == null) {
		return <h1>Authenticating</h1>;
	}

	return (
		<div className={spaceViewStyles('container')}>
			<div className={spaceViewStyles('topHeading')}>
				<BaseText variant="secondary-title" alignment="center">
					{space ? space.name : 'Loading Space'}
				</BaseText>
			</div>

			{SPACE_VIEW_TYPE === '3d' ? <SpaceView3D /> : <SpaceViewTiles />}

			<BaseRow
				direction="row"
				justifyContent="center"
				alignment="center"
				spacing={1}
				rails={2}
				xstyle={spaceViewStyles.bottomButtons}
			>
				<BaseButton onClick={() => setChatModalOpen(true)}>Chat</BaseButton>

				{chatModalOpen && <ChatModal onClose={() => setChatModalOpen(false)} />}

				<BaseButton to="..">Leave</BaseButton>

				<SpaceDeviceControlButtons />
			</BaseRow>
		</div>
	);
}
