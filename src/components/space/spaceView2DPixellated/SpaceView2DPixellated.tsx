import {useContext, useEffect, useState} from 'react';
import useKeyboardState from '../../../hooks/useKeyboardState';
import {createStylesheet} from '../../../styles/createStylesheet';
import {SpaceParticipant} from '../../../typings/Space';
import SpaceManagerContext from '../SpaceManagerContext';
import Peer from './Peer';
import Tile from './Tile';
import ViewerContext, {Position2D} from './ViewerContext';

const tiles: {position: Position2D}[] = [
	{position: {x: 0, y: 0}},
	{position: {x: 1, y: 0}},
	{position: {x: 0, y: 1}},
	{position: {x: 1, y: 1}},
];

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
	const manager = useContext(SpaceManagerContext);
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [lastDirection, setLastDirection] = useState<'left' | 'right'>('right');
	const [participants, setParticipants] = useState<
		Record<string, SpaceParticipant>
	>({});

	useEffect(() => {
		manager.addListener('user_join', (user) => {
			setParticipants((participants) => ({...participants, [user.id]: user}));
		});
		manager.addListener('user_leave', (user) => {
			setParticipants(({[user]: _, ...participants}) => participants);
		});
		manager.addListener('user_move', ({id, new_position}) => {
			setParticipants((participants) => ({
				...participants,
				[id]: {...participants[id], position: new_position},
			}));
		});
	}, [manager]);

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
				{Object.entries(participants).map(([id, participant]) => {
					return <Peer position={participant.position} key={id} />;
				})}
				<Peer position={{x, y}} me />
			</div>
		</ViewerContext.Provider>
	);
}
