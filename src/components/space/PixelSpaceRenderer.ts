import SpaceManager from './SpaceManager';
// import * as pixi from 'pixi.js';

function addCanvasResizeListeners(canvas: HTMLCanvasElement) {
	if (canvas.parentElement) {
		const fitCanvasToParent = () => {
			let {width, height} = canvas.parentElement!.getBoundingClientRect();
			canvas.width = width;
			canvas.height = height;
		};

		fitCanvasToParent();

		canvas.parentElement.addEventListener('resize', fitCanvasToParent);
	} else {
		const fitCanvasToWindow = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		fitCanvasToWindow();

		window.addEventListener('resize', fitCanvasToWindow);
	}
}

export default class PixelSpaceRenderer {
	// px: pixi.Application;

	private animating = false;
	private ctx: WebGL2RenderingContext;
	private shouldStop = false;

	constructor(canvas: HTMLCanvasElement, private spaceManager: SpaceManager) {
		addCanvasResizeListeners(canvas);
		this.ctx = canvas.getContext('webgl2')!;
	}

	stop() {
		this.shouldStop = true;
	}

	shouldBeRendering() {
		return !this.shouldStop;
	}

	render = () => {
		const gl = this.ctx;

		if (!this.shouldStop) {
			window.requestAnimationFrame(this.render);
		}
	};
}
