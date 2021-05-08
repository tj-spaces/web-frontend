import React, {ReactNode, useContext} from 'react';
import {Canvas} from 'react-three-fiber';
import AuthContext from '../AuthContext';
import PointOfViewContext from './PointOfViewContext';
import SimulationServerContext from './SimulationServerContext';
import SpaceAudioContext from './SpaceAudioContext';
import VoiceContext from './VoiceContext';

// Because 'Canvas' creates a new React renderer, contexts cannot be shared, unfortunately
// So we need to pass them in manually
export default function SpaceCanvasRoot({children}: {children: ReactNode}) {
	const auth = useContext(AuthContext);
	const simulation = useContext(SimulationServerContext);
	const mediaState = useContext(SpaceAudioContext);
	const voice = useContext(VoiceContext);

	return (
		<Canvas>
			<AuthContext.Provider value={auth}>
				<SimulationServerContext.Provider value={simulation}>
					<SpaceAudioContext.Provider value={mediaState}>
						<VoiceContext.Provider value={voice}>
							<PointOfViewContext.Provider value="first-person">
								{children}
							</PointOfViewContext.Provider>
						</VoiceContext.Provider>
					</SpaceAudioContext.Provider>
				</SimulationServerContext.Provider>
			</AuthContext.Provider>
		</Canvas>
	);
}
