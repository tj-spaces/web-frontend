import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {getLogger} from './ClusterLogger';

const savedModels: Record<string, THREE.Group> = {};

export function getModelURL(
	id: string,
	version: string,
	resolution: 'full',
	format: 'obj' | 'fbx'
) {
	return `https://nebulamodels.s3.amazonaws.com/models/${id}/v${version}_${resolution}.${format}`;
}

const logger = getLogger('loader/model-loader');

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
					logger.info({event: 'progress', data: ev.loaded / ev.total});
				});
				savedModels[url] = result;
				return result;
			}
			case 'obj': {
				const loader = new OBJLoader();
				const result = await loader.loadAsync(url, (ev) => {
					logger.info({event: 'progress', data: ev.loaded / ev.total});
				});
				savedModels[url] = result;
				return result;
			}
		}
	}
}
