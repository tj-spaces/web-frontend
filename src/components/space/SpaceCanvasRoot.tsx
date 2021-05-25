import React, {ReactNode, useContext} from 'react';
import {Canvas} from 'react-three-fiber';
import AuthContext from '../AuthContext';
import PointOfViewContext from './PointOfViewContext';
import SimulationServerContext from './simulation/SimulationServerContext';
import GlobalAudioContext from '../../lib/airwave/GlobalAudioContext';
import VoiceContext from '../../lib/airwave/VoiceContext';
import ChatContext from './chat/ChatContext';

// Because 'Canvas' creates a new React renderer, contexts cannot be shared, unfortunately
// So we need to pass them in manually
export default function SpaceCanvasRoot({children}: {children: ReactNode}) {
	const auth = useContext(AuthContext);
	const simulation = useContext(SimulationServerContext);
	const audio = useContext(GlobalAudioContext);
	const voice = useContext(VoiceContext);
	const chat = useContext(ChatContext);
	const pov = useContext(PointOfViewContext);

	return (
		<Canvas>
			<AuthContext.Provider value={auth}>
				<SimulationServerContext.Provider value={simulation}>
					<GlobalAudioContext.Provider value={audio}>
						<VoiceContext.Provider value={voice}>
							<ChatContext.Provider value={chat}>
								<PointOfViewContext.Provider value={pov}>
									{children}
								</PointOfViewContext.Provider>
							</ChatContext.Provider>
						</VoiceContext.Provider>
					</GlobalAudioContext.Provider>
				</SimulationServerContext.Provider>
			</AuthContext.Provider>
		</Canvas>
	);
}
