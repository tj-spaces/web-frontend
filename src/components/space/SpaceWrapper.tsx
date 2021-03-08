import {useContext, useEffect, useRef, useState} from 'react';
import {useSpace} from '../../api/spaces';
import {VoiceServer} from '../../mediautil/MediaConnector';
import joinSpace from '../../space/joinSpace';
import {createStylesheet} from '../../styles/createStylesheet';
import AuthContext from '../AuthContext';
import BaseButton from '../base/BaseButton';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import ChatModal from './chatModal/ChatModal';
import DeviceControlButtons from './DeviceControlButtons';
import SpaceManager from './Manager';
import SpaceManagerContext from './ManagerContext';
import Space from './Space';
import SpaceAudioContext from './SpaceAudioContext';
import SpaceVoiceContext from './VoiceContext';

const VOICE_SERVER_URL = 'ws://localhost:8080/websocket';

const styles = createStylesheet({
	container: {
		position: 'absolute',
		minWidth: '100%',
		height: '100vh',
		bottom: '0px',
		left: '0px',
		right: '0px',
		zIndex: 1,
	},
	/**
	 * The top heading. Currently only stores the space topic.
	 */
	topHeading: {
		backgroundColor: 'var(--bg-secondary)',

		position: 'absolute',
		top: '0px',
		left: '0px',
		right: '0px',
		height: '5em',
		paddingTop: '1em',
		paddingBottom: '1em',
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		subSelectors: {
			i: {
				cursor: 'pointer',
				fontSize: '3rem',
				marginRight: '1.5rem',
			},
		},
	},
	/**
	 * The mute/unmute, disable/enable camera, and Leave Space buttons container
	 */
	bottomButtons: {
		backgroundColor: 'var(--bg-secondary)',

		height: '5em',
		position: 'absolute',
		bottom: '0px',
		left: '0px',
		right: '0px',
	},
});

export default function SpaceWrapper({id}: {id: string}) {
	const connectionRef = useRef<WebSocket>();
	const [manager, setManager] = useState<SpaceManager>();
	const [voice, setVoice] = useState<VoiceServer>();
	const [audio, setAudio] = useState<AudioContext>();
	const auth = useContext(AuthContext);
	const space = useSpace(id);
	const [chatModalOpen, setChatModalOpen] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setAudio(new AudioContext());
		}, 5000);

		let voice = new VoiceServer(VOICE_SERVER_URL, auth.user!.id);
		setVoice(voice);

		return () => {
			voice.disconnect();
		};
	}, [auth.user]);

	useEffect(() => {
		if (voice) {
			navigator.getUserMedia(
				{audio: true},
				(stream) => {
					stream.getTracks().forEach((track) => {
						voice?.addLocalTrack(track, stream);
					});
				},
				(error) => {
					console.error('ERROR when adding local track:', error);
				}
			);
		}
	}, [voice]);

	useEffect(() => {
		if (voice) {
			voice.joinRoom(id);
			return () => {
				// TODO: Add room leaving code
			};
		}
	}, [id, voice]);

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
					<div className={styles('container')}>
						<div className={styles('topHeading')}>
							<BaseText variant="secondary-title" alignment="center">
								{space ? space.name : 'Loading Space'}
							</BaseText>
						</div>

						<Space />

						<BaseRow
							direction="row"
							justifyContent="center"
							alignment="center"
							spacing={1}
							rails={2}
							xstyle={styles.bottomButtons}
						>
							<BaseButton onClick={() => setChatModalOpen(true)}>
								Chat
							</BaseButton>

							{chatModalOpen && (
								<ChatModal onClose={() => setChatModalOpen(false)} />
							)}

							<BaseButton to="..">Leave</BaseButton>

							<DeviceControlButtons />
						</BaseRow>
					</div>
				</SpaceVoiceContext.Provider>
			</SpaceAudioContext.Provider>
		</SpaceManagerContext.Provider>
	);
}
