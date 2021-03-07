import React, {useEffect, useRef, useState} from 'react';
import {useSpace} from '../../api/spaces';
import {VoiceServer} from '../../mediautil/MediaConnector';
import joinSpace from '../../space/joinSpace';
import BaseButton from '../base/BaseButton';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import ChatModal from './chatModal/ChatModal';
import SpaceAudioContext from './SpaceAudioContext';
import SpaceDeviceControlButtons from './SpaceDeviceControlButtons';
import SpaceManager from './SpaceManager';
import SpaceManagerContext from './SpaceManagerContext';
import SpaceView3D from './spaceView3D/SpaceView3D';
import {spaceViewStyles} from './SpaceViewStyles';
import SpaceVoiceContext from './SpaceVoiceContext';

const VOICE_SERVER_URL = 'ws://localhost:8080';

export default function SpaceWrapper({id}: {id: string}) {
	const connectionRef = useRef<WebSocket>();
	const [manager, setManager] = useState<SpaceManager>();
	const [voice, setVoice] = useState<VoiceServer>();
	const [audio, setAudio] = useState<AudioContext>();
	const space = useSpace(id);
	const [chatModalOpen, setChatModalOpen] = useState(false);

	useEffect(() => {
		setAudio(new AudioContext());
		setVoice(new VoiceServer(VOICE_SERVER_URL));
	}, []);

	useEffect(() => {
		let manager = new SpaceManager(id);
		setManager(manager);

		(async () => {
			const {connection} = await joinSpace(id);
			connectionRef.current = connection;
			manager.setWebsocket(connection);
		})();

		return () => {
			manager.destroy();
		};
	}, [id]);

	if (!manager) {
		return null;
	}

	return (
		<SpaceManagerContext.Provider value={manager}>
			<SpaceAudioContext.Provider value={audio ?? null}>
				<SpaceVoiceContext.Provider value={voice ?? null}>
					<div className={spaceViewStyles('container')}>
						<div className={spaceViewStyles('topHeading')}>
							<BaseText variant="secondary-title" alignment="center">
								{space ? space.name : 'Loading Space'}
							</BaseText>
						</div>

						<SpaceView3D />

						<BaseRow
							direction="row"
							justifyContent="center"
							alignment="center"
							spacing={1}
							rails={2}
							xstyle={spaceViewStyles.bottomButtons}
						>
							<BaseButton onClick={() => setChatModalOpen(true)}>
								Chat
							</BaseButton>

							{chatModalOpen && (
								<ChatModal onClose={() => setChatModalOpen(false)} />
							)}

							<BaseButton to="..">Leave</BaseButton>

							<SpaceDeviceControlButtons />
						</BaseRow>
					</div>
				</SpaceVoiceContext.Provider>
			</SpaceAudioContext.Provider>
		</SpaceManagerContext.Provider>
	);
}
