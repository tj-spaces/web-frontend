import {Store, useStoredValue} from '../store/store';
import {Space, SpaceVisibility} from '../typings/Space';
import {makeAPIGetCall, makeAPIPostCall} from './utils';

export async function getSpace(spaceID: string): Promise<Space> {
	let result = await makeAPIGetCall('/api/spaces/' + spaceID);
	return result.data.data;
}

export async function getSpacesInCluster(id: string): Promise<Space[]> {
	let result = await makeAPIGetCall('/api/clusters/' + id + '/spaces');
	return result.data.data;
}

export async function createSpace(
	name: string,
	description: string,
	visibility: SpaceVisibility,
	allowsTemplating: boolean,
	clusterID?: string
): Promise<string> {
	let result = await makeAPIPostCall('/api/spaces', {
		name,
		description,
		visibility,
		allows_templating: allowsTemplating,
		cluster_id: clusterID,
	});
	return result.data.data.space_id;
}

export async function getSuggestedSpaces(): Promise<Space[]> {
	let result = await makeAPIGetCall('/api/spaces/suggested');
	return result.data.data;
}

const spaceStore = new Store((id) => getSpace(id));

export function useSpace(id: string) {
	return useStoredValue(spaceStore, id);
}
