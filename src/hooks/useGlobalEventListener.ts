/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
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
