/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
export type ClusterVisibility = 'discoverable' | 'unlisted' | 'secret';

export interface Cluster {
	id: string;
	creator_id: string;
	name: string;
	created_at: string;
	updated_at: string;
	visibility: ClusterVisibility;
	last_activity: string;
}
