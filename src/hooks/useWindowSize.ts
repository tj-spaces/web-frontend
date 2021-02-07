import {useState} from 'react';
import useGlobalEventListener from './useGlobalEventListener';

function getCurrentValue() {
	return {
		innerHeight: window.innerHeight,
		innerWidth: window.innerWidth,
		outerHeight: window.outerHeight,
		outerWidth: window.outerWidth,
	};
}

export default function useWindowSize() {
	const [windowSize, setWindowSize] = useState(getCurrentValue());

	useGlobalEventListener('resize', () => setWindowSize(getCurrentValue()));

	return windowSize;
}
