import {useState} from 'react';
import useGlobalEventListener from './useGlobalEventListener';

export default function useKeyboardState() {
	const [keys, setKeys] = useState<{[key: string]: boolean}>({});

	useGlobalEventListener('keydown', (ev: KeyboardEvent) => {
		// Only update if absolutely necessary
		if (!keys[ev.key]) {
			setKeys((keys) => ({
				...keys,
				[ev.key]: true,
			}));
		}
	});

	useGlobalEventListener('keyup', (ev: KeyboardEvent) => {
		setKeys((keys) => ({
			...keys,
			[ev.key]: false,
		}));
	});

	return keys;
}
