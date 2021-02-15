import {useLayoutEffect, useRef} from 'react';
import {ClassProvider, stylex} from '../styles/createStylesheet';

/**
 * When a user reaches the end of the LazyStream, it fetches more data using the `onReachedEnd` method
 */
export default function LazyStream({
	onReachEnd,
	fetching,
	xstyle,
	children,
}: {
	onReachEnd: () => unknown;
	fetching: boolean;
	xstyle?: ClassProvider;
	children: React.ReactNode;
}) {
	let streamRef = useRef<HTMLDivElement>(null);
	let streamEndRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		// Don't add any listeners if we're currently fetching
		if (fetching) {
			return;
		}

		let stream = streamRef.current;
		let streamEnd = streamEndRef.current;

		const scrollListener = () => {
			if (stream && streamEnd) {
				let containerHeight = stream.getBoundingClientRect().height;
				let {y} = streamEnd.getBoundingClientRect();
				if (y > 0 && y < containerHeight) {
					// The end of the stream is in view
					onReachEnd();
				}
			}
		};

		// Add the fetch callback to `streamEndRef`
		stream?.addEventListener('scroll', scrollListener);

		return () => {
			stream?.removeEventListener('scroll', scrollListener);
		};
	}, [fetching, onReachEnd]);

	return (
		<div ref={streamRef} className={stylex(xstyle)}>
			{children}

			{/* When this item is in the viewport, we've reached the end of the stream */}
			<div ref={streamEndRef} style={{display: 'none'}} />
		</div>
	);
}
