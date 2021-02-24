import React, {useEffect, useRef, useState} from 'react';
import {useContext} from 'react';
import {connect, Room} from 'twilio-video';
import {useSpace} from '../../api/spaces';
import joinSpace from '../../space/joinSpace';
import AuthContext from '../AuthContext';
import BaseButton from '../base/BaseButton';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import ChatModal from './chatModal/ChatModal';
import SpaceDeviceControlButtons from './SpaceDeviceControlButtons';
import SpaceManager from './SpaceManager';
import SpaceManagerContext from './SpaceManagerContext';
import SpaceMediaWrapper from './SpaceMediaWrapper';
import SpaceView3D from './spaceView3D/SpaceView3D';
import {spaceViewStyles} from './SpaceViewStyles';
import SpaceViewTiles from './spaceViewTiles/SpaceViewTiles';

const SPACE_VIEW_TYPE: 'pixel' | '3d' = 'pixel';

export default function Space({id}: {id: string}) {
	const [twilioRoom, setTwilioRoom] = useState<Room | null>(null);
	const connectionRef = useRef<WebSocket>();
	const managerRef = useRef<SpaceManager>(new SpaceManager(id));
	const space = useSpace(id);

	const {user} = useContext(AuthContext);
	const [chatModalOpen, setChatModalOpen] = useState(false);

	useEffect(() => {
		(async () => {
			const {connection, twilioGrant} = await joinSpace(id);
			connectionRef.current = connection;
			managerRef.current.setWebsocket(connection);

			// setTwilioRoom(await connect(twilioGrant));
		})();
	}, [id]);

	if (user == null) {
		return <h1>Authenticating</h1>;
	}

	return (
		<SpaceManagerContext.Provider value={managerRef.current}>
			<SpaceMediaWrapper twilioRoom={twilioRoom}>
				<div className={spaceViewStyles('container')}>
					<div className={spaceViewStyles('topHeading')}>
						<BaseText variant="secondary-title" alignment="center">
							{space ? space.name : 'Loading Space'}
						</BaseText>
					</div>

					<canvas ref={(ref) => ref && managerRef.current.setCanvas(ref)} />

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

						{chatModalOpen && (
							<ChatModal onClose={() => setChatModalOpen(false)} />
						)}

						<BaseButton to="..">Leave</BaseButton>

						<SpaceDeviceControlButtons />
					</BaseRow>
				</div>
			</SpaceMediaWrapper>
		</SpaceManagerContext.Provider>
	);
}
