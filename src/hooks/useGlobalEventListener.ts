import {useEffect} from 'react';

export default function useGlobalEventListener<K extends keyof WindowEventMap>(
	event: K,
	listener: (this: Window, ev: WindowEventMap[K]) => any,
	options?: boolean | AddEventListenerOptions
) {
	useEffect(() => {
		window.addEventListener(event, listener, options);
		return () => {
			window.removeEventListener(event, listener);
		};
	}, [event, listener, options]);
}
