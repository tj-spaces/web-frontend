import SpaceManager from './SpaceManager';
import * as THREE from 'three';
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
	private r: THREE.WebGLRenderer;
	private s: THREE.Scene;
	private c: THREE.Camera;
	private shouldStop = false;

	constructor(canvas: HTMLCanvasElement, private spaceManager: SpaceManager) {
		addCanvasResizeListeners(canvas);
		this.r = new THREE.WebGLRenderer({canvas});
		this.r.xr.enabled = true;
		this.s = new THREE.Scene();
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshPhongMaterial();
		const cube = new THREE.Mesh(geometry, material);
		this.s.add(cube);
		this.r.setAnimationLoop(this.render);
		this.c = new THREE.Camera();
	}

	render = () => {
		this.r.render(this.s, this.c);
	};
}
