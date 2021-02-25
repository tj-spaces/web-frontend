import {createContext} from 'react';

export type Position2D = {
	/** Left/right */
	x: number;
	/** Up/down */
	y: number;
};

export type Viewer = {
	position: Position2D;
	zoom: number;
	lastDirection: 'left' | 'right';
};

const ViewerContext = createContext<Viewer>(null!);

export default ViewerContext;
