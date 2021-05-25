import {useEffect, useRef} from 'react';

export default function useInterval(callback: () => void, ms: number) {
	// We use this so we don't need to set/clear the interval every time
	// the callback changes
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		const interval = setInterval(() => {
			callbackRef.current();
		}, ms);

		return () => clearInterval(interval);
	}, [ms]);
}
