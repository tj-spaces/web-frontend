import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';

const savedModels: Record<string, THREE.Group> = {};
const loader = new FBXLoader();

export async function loadModel(url: string): Promise<THREE.Group> {
	if (url in savedModels) {
		return savedModels[url];
	} else {
		let result = await loader.loadAsync(url, (ev) => {
			console.log('Model load status:', ev.loaded / ev.total);
		});
		savedModels[url] = result;
		return result;
	}
}
