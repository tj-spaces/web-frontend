import {useEffect} from 'react';

export default function useControlKeyCommand(
	otherKey: string,
	callback: () => void,
	element: HTMLElement = document.body
) {
	useEffect(() => {
		const onKeydown = (event: KeyboardEvent) => {
			if (event.key === otherKey && event.ctrlKey) {
				event.preventDefault();
				callback();
			}
		};

		element.addEventListener('keydown', onKeydown);

		return () => {
			element.removeEventListener('keydown', onKeydown);
		};
	}, [callback, element, otherKey]);
}
