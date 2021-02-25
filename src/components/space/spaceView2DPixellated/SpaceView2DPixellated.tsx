import {useEffect, useState} from 'react';
import useKeyboardState from '../../../hooks/useKeyboardState';
import {createStylesheet} from '../../../styles/createStylesheet';
import Peer from './Peer';
import Tile from './Tile';
import ViewerContext, {Position2D} from './ViewerContext';

const tiles: {position: Position2D}[] = [
	{position: {x: 0, y: 0}},
	{position: {x: 1, y: 0}},
	{position: {x: 0, y: 1}},
	{position: {x: 1, y: 1}},
];

const peers: Position2D[] = [{x: 0, y: 0}];

const styles = createStylesheet({
	viewport: {
		position: 'relative',
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		zIndex: -1,
	},
});

/**
 * Creates a 2D view using HTML images.
 */
export default function SpaceView2DPixellated() {
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [lastDirection, setLastDirection] = useState<'left' | 'right'>('right');

	const {a, s, d, w} = useKeyboardState(document.body);

	useEffect(() => {
		if (a) {
			setLastDirection('left');
			setX((x) => x - 1);
		}
	}, [a]);
	useEffect(() => {
		if (d) {
			setLastDirection('right');
			setX((x) => x + 1);
		}
	}, [d]);
	useEffect(() => {
		if (s) {
			setY((y) => y + 1);
		}
	}, [s]);
	useEffect(() => {
		if (w) {
			setY((y) => y - 1);
		}
	}, [w]);

	return (
		<ViewerContext.Provider value={{position: {x, y}, zoom: 1, lastDirection}}>
			<div className={styles('viewport')}>
				{tiles.map((tile, idx) => (
					<Tile src="/wood.jpg" position={tile.position} key={idx} />
				))}
				{peers.map((peer, idx) => (
					<Peer position={peer} key={idx} />
				))}
				<Peer position={{x, y}} me />
			</div>
		</ViewerContext.Provider>
	);
}
