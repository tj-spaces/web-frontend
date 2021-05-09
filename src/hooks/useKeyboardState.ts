/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useCallback, useEffect, useState} from 'react';

export default function useKeyboardState(attach: HTMLElement | null) {
	const [keys, setKeys] = useState<{[key: string]: boolean}>({});

	const onKeyDown = useCallback((ev: KeyboardEvent) => {
		// Don't update if the key didn't change
		setKeys((keys) => (!keys[ev.key] ? {...keys, [ev.key]: true} : keys));
	}, []);

	const onKeyUp = useCallback((ev: KeyboardEvent) => {
		setKeys((keys) => ({...keys, [ev.key]: false}));
	}, []);

	useEffect(() => {
		if (attach) {
			attach.addEventListener('keydown', onKeyDown);
			attach.addEventListener('keyup', onKeyUp);

			return () => {
				attach.removeEventListener('keydown', onKeyDown);
				attach.removeEventListener('keyup', onKeyUp);
				setKeys({});
			};
		}
	}, [attach, onKeyDown, onKeyUp]);

	return keys;
}
