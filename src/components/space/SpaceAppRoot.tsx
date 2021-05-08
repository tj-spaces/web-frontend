/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useEffect, useState} from 'react';
import {getSpaceServerURLs, useSpace} from '../../api/spaces';
// import {getLogger} from '../../lib/ClusterLogger';
import {createStylesheet} from '../../styles/createStylesheet';
import {useCurrentUser} from '../AuthHooks';
import BaseText from '../base/BaseText';
import SimulationServerProvider from './simulation/SimulationServerProvider';
import Space from './Space';
import SpaceConnectionErrored from './SpaceConnectionErrored';
import SpaceFooter from './SpaceFooter';
import SpaceInfoMessage from './SpaceInfoMessage';
import SpaceMediaProvider from './SpaceAudioContextProvider';
import UserSettingsProvider from './userSettings/UserSettingsProvider';
import VoiceProvider from './airwave/VoiceProvider';

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
	content: {
		position: 'absolute',
		left: '0px',
		right: '0px',
		top: '5em',
		bottom: '5em',
	},
});

export default function SpaceAppRoot({id}: {id: string}) {
	const [audio, setAudio] = useState<AudioContext | null>(null);
	const [connectionStatus, setConnectionStatus] = useState<
		null | 'connecting' | 'connected' | 'errored'
	>('connected');

	const [currentMessage] = useState<string>();
	const [voiceURL, setVoiceURL] = useState<string>();
	const [simulationURL, setSimulationURL] = useState<string>();
	const [token, setToken] = useState<string>();

	// const setCurrentMessage = useCallback((message: string, time: number) => {
	// 	__setCurrentMessage(message);
	// 	setTimeout(() => __setCurrentMessage(undefined), time);
	// }, []);

	const user = useCurrentUser();
	const space = useSpace(id);

	useEffect(() => {
		// setConnectionStatus('connecting');

		getSpaceServerURLs(id)
			.then(({voiceURL, simulationURL, token}) => {
				setSimulationURL(simulationURL);
				setToken(token);
				setVoiceURL(voiceURL);
			})
			.catch(() => setConnectionStatus('errored'));
	}, [user, id]);

	return (
		<SimulationServerProvider simulationURL={simulationURL} token={token}>
			<UserSettingsProvider>
				<SpaceMediaProvider audioContext={audio} setAudioContext={setAudio}>
					<VoiceProvider voiceURL={voiceURL}>
						<div className={styles('container')}>
							<div className={styles('topHeading')}>
								<BaseText variant="secondary-title" alignment="center">
									{space && 'value' in space ? space.value.name : 'Loading'}
								</BaseText>
							</div>

							<div className={styles('content')}>
								{currentMessage && (
									<SpaceInfoMessage message={currentMessage} />
								)}

								{connectionStatus === 'errored' && <SpaceConnectionErrored />}

								{connectionStatus === 'connected' && <Space />}
							</div>

							<SpaceFooter />
						</div>
					</VoiceProvider>
				</SpaceMediaProvider>
			</UserSettingsProvider>
		</SimulationServerProvider>
	);
}
