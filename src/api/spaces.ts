/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {Store, useStoredValue} from '../store/store';
import {Space, SpaceVisibility} from '../typings/Space';
import {WorldType} from '../typings/Types';
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
	worldType: WorldType,
	clusterID?: string
): Promise<string> {
	let result = await makeAPIPostCall('/api/spaces', {
		name,
		description,
		visibility,
		allows_templating: allowsTemplating,
		cluster_id: clusterID,
		world_type: worldType,
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

export interface JoinSpaceData {
	code: string;
	voiceURL: string;
	simulationURL: string;
}

/**
 *
 * @param id The ID of the space to fetch the join code for
 */
export async function getSpaceJoinCode(id: string): Promise<JoinSpaceData> {
	const result = await makeAPIGetCall(`/api/spaces/${id}/join`);
	return result.data.data;
}
