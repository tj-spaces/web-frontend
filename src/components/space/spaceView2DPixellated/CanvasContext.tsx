import {createContext} from 'react';

/**
 * Context containing the width and height of the 2D space's canvas, in rems.
 */
const CanvasContext = createContext<{width: number; height: number}>(null!);

export default CanvasContext;
