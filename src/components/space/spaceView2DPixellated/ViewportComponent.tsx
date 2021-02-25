import {useContext, CSSProperties} from 'react';
import ViewerContext, {Position2D} from './ViewerContext';

/**
 * When zoom = 1, the image should be this many rems wide and tall.
 */
export const baseSizeRem = 5;

export default function ViewportComponent({
	position,
	children,
}: {
	position: Position2D;
	children: React.ReactNode;
}) {
	const viewer = useContext(ViewerContext);

	if (viewer.zoom === 0) {
		throw new Error("Viewer's zoom is 0, this should never happen");
	}

	const tileSizeRem = baseSizeRem * (1 / viewer.zoom);

	const relativeX = position.x - viewer.position.x;
	const relativeY = position.y - viewer.position.y;
	const relativeXRem = relativeX * tileSizeRem;
	const relativeYRem = relativeY * tileSizeRem;

	const style: CSSProperties = {
		position: 'absolute',
		left: `calc(50% + ${relativeXRem}rem)`,
		top: `calc(50% + ${relativeYRem}rem)`,
		transition: 'left 0.5s ease, top 0.5s ease',
	};

	return <div style={style}>{children}</div>;
}
