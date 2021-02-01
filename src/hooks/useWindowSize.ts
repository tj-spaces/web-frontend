import { useEffect, useState } from 'react';

function getCurrentValue() {
	return {
		innerHeight: window.innerHeight,
		innerWidth: window.innerWidth,
		outerHeight: window.outerHeight,
		outerWidth: window.outerWidth
	};
}
export default function useWindowSize() {
	const [windowSize, setWindowSize] = useState(getCurrentValue());

	useEffect(() => {
		const onResize = () => setWindowSize(getCurrentValue());

		window.addEventListener('resize', onResize);

		return () => window.removeEventListener('resize', onResize);
	});

	return windowSize;
}
