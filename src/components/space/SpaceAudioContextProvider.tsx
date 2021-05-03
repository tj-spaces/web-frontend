import {Dispatch, SetStateAction} from 'react';
import SpaceAudioContext from './SpaceAudioContext';

export default function SpaceMediaProvider({
	children,
	audioContext,
	setAudioContext,
}: {
	children: React.ReactNode;
	audioContext: AudioContext | null;
	setAudioContext: Dispatch<SetStateAction<AudioContext | null>>;
}) {
	return (
		<SpaceAudioContext.Provider value={[audioContext, setAudioContext]}>
			{children}
		</SpaceAudioContext.Provider>
	);
}
