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
import BaseButton from '../base/BaseButton';
import BaseRow from '../base/BaseRow';
import BaseText from '../base/BaseText';
import EnterPreparationModal from './EnterPreparationModal';
import LocalDevicesProvider from './LocalDevicesProvider';
import SimulationServer from './SimulationServer';
import SimulationServerContext from './SimulationServerContext';
import Space from './Space';
import {SpaceFooter} from './SpaceFooter';
import SpaceMediaProvider from './SpaceMediaProvider';
import UserSettingsProvider from './UserSettingsProvider';
import VoiceProvider from './VoiceProvider';

// const logger = getLogger('space/wrapper');

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

export default function SpaceAppRoot({id}: {id: string}) {
	const [simulation, setSimulation] = useState<SimulationServer>();
	const [audio, setAudio] = useState<AudioContext | null>(null);
	const [connectionStatus, setConnectionStatus] = useState<
		null | 'connecting' | 'connected' | 'errored'
	>(null);

	/**
	 * 'ready' is true when a user has chosen their settings before entering a Space.
	 */
	const [ready, setReady] = useState(false);
	const [currentMessage] = useState<string>();
	const [voiceURL, setVoiceURL] = useState<string>();

	// const setCurrentMessage = useCallback((message: string, time: number) => {
	// 	__setCurrentMessage(message);
	// 	setTimeout(() => __setCurrentMessage(undefined), time);
	// }, []);

	const user = useCurrentUser();
	const space = useSpace(id);

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
	}, [user, id]);

	if (!simulation) {
		return null;
	}

	return (
		<SimulationServerContext.Provider value={simulation}>
			<UserSettingsProvider>
				<LocalDevicesProvider>
					<SpaceMediaProvider audioContext={audio} voiceServer={null}>
						{!ready ? (
							<EnterPreparationModal
								onReady={() => {
									setReady(true);
									setAudio(new AudioContext());
								}}
								onCancel={window.history.back.bind(window.history)}
							/>
						) : (
							<VoiceProvider spaceID={id} voiceURL={voiceURL}>
								<div className={styles('container')}>
									<div className={styles('topHeading')}>
										<BaseText variant="secondary-title" alignment="center">
											{space && 'value' in space ? space.value.name : 'Loading'}
										</BaseText>
									</div>

									<div className={styles('content')}>
										{currentMessage && (
											<BaseText
												variant="secondary-title"
												xstyle={styles.message}
											>
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

									<SpaceFooter />
								</div>
							</VoiceProvider>
						)}
					</SpaceMediaProvider>
				</LocalDevicesProvider>
			</UserSettingsProvider>
		</SimulationServerContext.Provider>
	);
}
