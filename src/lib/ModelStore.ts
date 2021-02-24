import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';

const savedModels: Record<string, THREE.Group> = {};

export function getModelURL(
	id: string,
	version: string,
	resolution: 'full',
	format: 'obj' | 'fbx'
) {
	return `https://nebulamodels.s3.amazonaws.com/models/${id}/v${version}_${resolution}.${format}`;
}

export async function loadModel(
	url: string,
	type: 'fbx' | 'obj'
): Promise<THREE.Group> {
	if (url in savedModels) {
		return savedModels[url];
	} else {
		switch (type) {
			case 'fbx': {
				const loader = new FBXLoader();
				const result = await loader.loadAsync(url, (ev) => {
					console.log('Model load status:', ev.loaded / ev.total);
				});
				savedModels[url] = result;
				return result;
			}
			case 'obj': {
				const loader = new OBJLoader();
				const result = await loader.loadAsync(url, (ev) => {
					console.log('Model load status:', ev.loaded / ev.total);
				});
				savedModels[url] = result;
				return result;
			}
		}
	}
}
