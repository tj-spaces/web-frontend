import SpaceManager from './SpaceManager';
import * as pixi from 'pixi.js';

export default class PixelSpaceRenderer {
	constructor(
		private ctx: CanvasRenderingContext2D,
		private spaceManager: SpaceManager
	) {}
}
