import SpaceManager from './SpaceManager';
import * as THREE from 'three';
import {getModelURL, loadModel} from '../../lib/ModelStore';
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls';
import {useEffect} from 'react';
import {useState} from 'react';

export type FocusChangedListener = (focused: boolean) => void;

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
	private obj: THREE.Group | null = null;
	private controls: PointerLockControls;

	private focusChangedListeners = new Set<FocusChangedListener>();
	private focused = false;

	addFocusChangedListener(listener: FocusChangedListener) {
		this.focusChangedListeners.add(listener);
		return () => {
			this.focusChangedListeners.delete(listener);
		};
	}

	private setFocused(focused: boolean) {
		this.focused = focused;
		this.focusChangedListeners.forEach((listener) => {
			listener(focused);
		});
	}

	/**
	 * Focuses the controls
	 */
	focus = () => {
		this.setFocused(true);
		this.controls.lock();
	};

	/**
	 * Unfocuses the controls
	 */
	unfocus = () => {
		this.setFocused(false);
		this.controls.unlock();
	};

	isFocused = () => {
		return this.focused;
	};

	constructor(canvas: HTMLCanvasElement, private spaceManager: SpaceManager) {
		this.renderer = new THREE.WebGLRenderer({canvas});
		this.renderer.xr.enabled = true;
		this.scene = new THREE.Scene();
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshPhongMaterial();
		this.cube = new THREE.Mesh(geometry, material);

		this.cube.position.set(0, 0, -2);

		this.cube.visible = false;

		loadModel(getModelURL('ping_pong_table', '0', 'full', 'obj'), 'obj').then(
			(obj) => {
				obj.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
				obj.position.set(0, -50, 0);
				this.obj = obj;
				this.scene.add(obj);
			}
		);

		this.scene.add(this.cube);
		this.renderer.setAnimationLoop(this.render);

		const fov = 75;
		const aspect = 2; // the canvas default
		const near = 0.1;
		const far = 2000;

		this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
		this.camera.position.z = 250;
		this.controls = new PointerLockControls(this.camera, canvas);

		this.controls.addEventListener('unlock', () => {
			// When the user presses the "escape" key
			this.setFocused(false);
		});

		this.addLight();

		this.addCanvasResizeListeners(canvas);
	}

	private addLight() {
		const color = 0xffffff;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-1, 2, 4);
		this.scene.add(light);
	}

	setCameraPosition(x: number, y: number, z: number) {
		this.camera.position.set(x, y, z);
	}

	setCameraRotation(x: number, y: number, z: number) {
		this.camera.rotation.set(x, y, z);
	}

	render = () => {
		// @ts-expect-error
		window.camera = this.camera;

		if (this.obj) {
			this.obj.rotateZ(0.0005);
		}

		// this.cube.rotateY(0.01);

		this.renderer.render(this.scene, this.camera);
	};
}

/**
 * Allows you to hook onto whether pointer lock controls are one
 */
export function useFocusState(manager: SpaceManager) {
	const [focused, setFocused] = useState(manager.renderer?.isFocused());

	useEffect(() => {
		if (manager.renderer) {
			setFocused(manager.renderer.isFocused());
			let removeListener = manager.renderer.addFocusChangedListener((focus) => {
				setFocused(focus);
			});
			return () => {
				removeListener();
			};
		}
	}, [manager.renderer]);

	return focused;
}
