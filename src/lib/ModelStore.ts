import * as GLTFLoader from 'three/examples/jsm/loaders/GLTFLoader';

const savedModels: Record<string, GLTFLoader.GLTF> = {};
const loader = new GLTFLoader.GLTFLoader();

export async function loadModel(url: string): Promise<GLTFLoader.GLTF> {
	if (url in savedModels) {
		return savedModels[url];
	} else {
		let result = await loader.loadAsync(url);
		savedModels[url] = result;
		return result;
	}
}
