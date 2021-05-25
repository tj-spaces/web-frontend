import {createContext, Dispatch, SetStateAction} from 'react';

const GlobalAudioContext = createContext<
	[AudioContext | null, Dispatch<SetStateAction<AudioContext | null>>]
>(null!);

export default GlobalAudioContext;
