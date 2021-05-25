import {ReactNode, useState} from 'react';
import GlobalAudioContext from '@airwave/GlobalAudioContext';

export default function AudioContextProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
	return (
		<GlobalAudioContext.Provider value={[audioContext, setAudioContext]}>
			{children}
		</GlobalAudioContext.Provider>
	);
}
