import {createContext, Dispatch, SetStateAction} from 'react';

const SpaceAudioContext = createContext<
	[AudioContext | null, Dispatch<SetStateAction<AudioContext | null>>]
>(null!);

export default SpaceAudioContext;
