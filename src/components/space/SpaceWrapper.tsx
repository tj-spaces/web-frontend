/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {getSpaceServerURLs, useSpace} from '../../api/spaces';
import {getLogger} from '../../lib/ClusterLogger';
import getUserMedia from '../../lib/getUserMedia';
import {createStylesheet} from '../../styles/createStylesheet';
import AuthContext from '../AuthContext';
import BaseButton from '../base/BaseButton';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import ChatModal from './chatModal/ChatModal';
import DeviceControlButtons from './DeviceControlButtons';
import EnterPreparationModal from './EnterPreparationModal';
import LocalDevicesSDK from './LocalDevicesSDK';
import SimulationServer from './SimulationServer';
import SimulationServerContext from './SimulationServerContext';
import Space from './Space';
import SpaceMediaStateProvider from './SpaceMediaProvider';
import VoiceWrapper from './VoiceWrapper';

const logger = getLogger('space/wrapper');

const styles = createStylesheet({
	container: {
		position: 'absolute',
		minWidth: '100%',
		height: '100%',
		inset: '0px',
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
		zIndex: 1,
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
	content: {
		height: '100%',
		top: '5em',
		bottom: '5em',
	},
	/**
	 * Message
	 */
	message: {
		position: 'absolute',
		top: '50%',
		width: '100%',
		textAlign: 'center',
		zIndex: 1,
	},
});

export default function SpaceWrapper({id}: {id: string}) {
	const localDevicesSDK = useMemo(() => new LocalDevicesSDK(), []);
	const [simulation, setSimulation] = useState<SimulationServer>();
	const [audio, setAudio] = useState<AudioContext | null>(null);
	const [chatModalOpen, setChatModalOpen] = useState(false);
	const [connectionStatus, setConnectionStatus] = useState<
		null | 'connecting' | 'connected' | 'errored'
	>(null);

	/**
	 * 'ready' is true when a user has chosen their settings before entering a Space.
	 */
	const [ready, setReady] = useState(false);
	const [currentMessage, __setCurrentMessage] = useState<string>();
	const [voiceURL, setVoiceURL] = useState<string>();

	const setCurrentMessage = useCallback((message: string, time: number) => {
		__setCurrentMessage(message);
		setTimeout(() => __setCurrentMessage(undefined), time);
	}, []);

	const auth = useContext(AuthContext);
	const space = useSpace(id);

	useEffect(() => {
		return () => localDevicesSDK.closeMediaStream();
	}, [localDevicesSDK]);

	useEffect(() => {
		setConnectionStatus('connecting');

		getSpaceServerURLs(id)
			.then(({voiceURL, simulationURL, token}) => {
				let simulation = new SimulationServer(id, simulationURL, token);
				simulation.on('connected', () => setConnectionStatus('connected'));

				setSimulation(simulation);
				setVoiceURL(voiceURL);
			})
			.catch(() => setConnectionStatus('errored'));
	}, [auth.user, id]);

	useEffect(() => {
		if (ready) {
			const onGetUserMediaError = () =>
				setCurrentMessage('Microphone is Disabled', 10000);
			if (getUserMedia) {
				getUserMedia(
					{audio: true, video: true},
					(stream) => localDevicesSDK.setMediaStream(stream),
					(error) => {
						logger.error({event: 'get_user_media', error});
						onGetUserMediaError();
					}
				);
			} else {
				onGetUserMediaError();
			}
		}
	}, [localDevicesSDK, ready, setCurrentMessage]);

	if (!simulation) {
		return null;
	}

	return (
		<SimulationServerContext.Provider value={simulation}>
			<SpaceMediaStateProvider
				localDevicesSDK={localDevicesSDK}
				audioContext={audio}
				voiceServer={null}
			>
				{!ready ? (
					<EnterPreparationModal
						onReady={() => {
							setReady(true);
							setAudio(new AudioContext());
						}}
					/>
				) : (
					<VoiceWrapper spaceID={id} voiceURL={voiceURL}>
						<div className={styles('container')}>
							<div className={styles('topHeading')}>
								<BaseText variant="secondary-title" alignment="center">
									{space && 'value' in space ? space.value.name : 'Loading'}
								</BaseText>
							</div>

							<div className={styles('content')}>
								{currentMessage && (
									<BaseText variant="secondary-title" xstyle={styles.message}>
										{currentMessage}
									</BaseText>
								)}

								{connectionStatus === 'errored' && (
									<BaseRow
										direction="column"
										alignment="center"
										justifyContent="center"
										height="100%"
									>
										<BaseText variant="secondary-title">
											Couldn't connect.{' '}
										</BaseText>
										<BaseButton
											variant="positive"
											onClick={() => window.location.reload()}
										>
											Retry
										</BaseButton>
									</BaseRow>
								)}

								{connectionStatus === 'connected' && <Space />}
							</div>

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
					</VoiceWrapper>
				)}
			</SpaceMediaStateProvider>
		</SimulationServerContext.Provider>
	);
}
