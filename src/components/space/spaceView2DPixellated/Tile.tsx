import {useContext} from 'react';
import ViewerContext, {Position2D} from './ViewerContext';
import ViewportComponent, {baseSizeRem} from './ViewportComponent';

/**
 * Renders a tile-based image.
 */
export default function Tile({
	src,
	position,
	onClick,
}: {
	src: string;
	position: Position2D;
	onClick?: () => void;
}) {
	const {zoom} = useContext(ViewerContext);

	if (zoom === 0) {
		throw new Error("Viewer's zoom is 0, this should never happen");
	}

	const tileSizeRem = baseSizeRem * (1 / zoom);

	return (
		<ViewportComponent position={position}>
			<img
				src={src}
				alt=""
				style={{width: `${tileSizeRem}rem`, height: `${tileSizeRem}rem`}}
				onClick={onClick}
			/>
		</ViewportComponent>
	);
}
