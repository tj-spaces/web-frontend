import SpaceManager from './SpaceManager';
import * as THREE from 'three';
import {loadModel} from '../../lib/ModelStore';

export default class PixelSpaceRenderer {
	addCanvasResizeListeners = (canvas: HTMLCanvasElement) => {
		if (canvas.parentElement) {
			const fitCanvasToParent = () => {
				let {width, height} = canvas.parentElement!.getBoundingClientRect();
				canvas.width = width;
				canvas.height = height;

				this.camera.aspect = canvas.width / canvas.height;
				this.camera.updateProjectionMatrix();
			};

			fitCanvasToParent();

			canvas.parentElement.addEventListener('resize', fitCanvasToParent);
		} else {
			const fitCanvasToWindow = () => {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;

				this.camera.aspect = canvas.width / canvas.height;
				this.camera.updateProjectionMatrix();
			};

			fitCanvasToWindow();

			window.addEventListener('resize', fitCanvasToWindow);
		}
	};

	private renderer: THREE.WebGLRenderer;
	private scene: THREE.Scene;
	private camera: THREE.PerspectiveCamera;
	private cube: THREE.Mesh;

	constructor(canvas: HTMLCanvasElement, private spaceManager: SpaceManager) {
		this.renderer = new THREE.WebGLRenderer({canvas});
		this.renderer.xr.enabled = true;
		this.scene = new THREE.Scene();
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshPhongMaterial();
		this.cube = new THREE.Mesh(geometry, material);

		this.cube.position.set(0, 0, -2);

		this.cube.visible = false;

		loadModel(
			'https://nebulamodels.s3.amazonaws.com/models/sports_car/v0/fbx/audi-r8-red.fbx'
		).then((obj) => {
			console.log(obj);
			obj.position.set(0, -1.5, -4);
			obj.rotation.set(0, Math.PI / 4, 0);
			this.scene.add(obj);
		});

		this.scene.add(this.cube);
		this.renderer.setAnimationLoop(this.render);

		const fov = 75;
		const aspect = 2; // the canvas default
		const near = 0.1;
		const far = 50;
		this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

		{
			const color = 0xffffff;
			const intensity = 1;
			const light = new THREE.DirectionalLight(color, intensity);
			light.position.set(-1, 2, 4);
			this.scene.add(light);
		}

		this.addCanvasResizeListeners(canvas);
	}

	setCameraPosition(x: number, y: number, z: number) {
		this.camera.position.set(x, y, z);
	}

	setCameraRotation(x: number, y: number, z: number) {
		this.camera.rotation.set(x, y, z);
	}

	render = () => {
		this.cube.rotateY(0.01);

		this.renderer.render(this.scene, this.camera);
	};
}
