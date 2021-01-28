import { useState, useEffect } from 'react';

export default function useKeyboardState() {
	const [keys, setKeys] = useState<{ [key: string]: boolean }>({});

	useEffect(() => {
		const onKeyDown = (ev: KeyboardEvent) => {
			// Only update if absolutely necessary
			if (!keys[ev.key]) {
				setKeys((keys) => ({
					...keys,
					[ev.key]: true
				}));
			}
		};
		const onKeyUp = (ev: KeyboardEvent) => {
			setKeys((keys) => ({
				...keys,
				[ev.key]: false
			}));
		};

		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('keyup', onKeyUp);
		};
	}, [keys]);

	return keys;
}
