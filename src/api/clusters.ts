/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useEffect, useState} from 'react';
import {Store, useStoredValue} from '../store/store';
import {Cluster, ClusterVisibility} from '../typings/Cluster';
import {PublicUserInfo} from '../typings/PublicUserInfo';
import {makeAPIGetCall, makeAPIPostCall, makeAPIDeleteCall} from './utils';

export async function getDiscoverableClusters(): Promise<Cluster[]> {
	let result = await makeAPIGetCall('/api/clusters/discoverable');
	return result.data.data;
}

export async function createCluster(
	name: string,
	visibility: ClusterVisibility
): Promise<string> {
	let result = await makeAPIPostCall('/api/clusters', {name, visibility});
	return result.data.data.cluster_id;
}

export async function getCluster(id: string): Promise<Cluster> {
	let result = await makeAPIGetCall('/api/clusters/' + id);
	return result.data.data;
}

export async function getMyClusters(): Promise<Cluster[]> {
	let result = await makeAPIGetCall('/api/users/@me/clusters');
	return result.data.data;
}

export async function getClusterMembers(id: string): Promise<PublicUserInfo[]> {
	let result = await makeAPIGetCall('/api/clusters/' + id + '/members');
	return result.data.data;
}

export async function joinCluster(clusterID: string): Promise<void> {
	await makeAPIPostCall('/api/clusters/' + clusterID + '/join');
}

export async function deleteCluster(id: string): Promise<void> {
	await makeAPIDeleteCall('/api/clusters/' + id);
}

const store = new Store<Cluster>((id: string) => getCluster(id));

export function useCluster(clusterID: string) {
	return useStoredValue(store, clusterID);
}

export function useMyClusters() {
	const [spaces, setClusters] = useState<Cluster[]>();

	useEffect(() => {
		getMyClusters().then((clusters) => setClusters(clusters));
	}, []);

	return spaces;
}
