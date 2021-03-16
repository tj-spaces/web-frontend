/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {useCallback} from 'react';
import {reportError} from '../../../api/analytics';
import {deleteCluster} from '../../../api/clusters';
import {Cluster} from '../../../typings/Cluster';
import BaseButton from '../../base/BaseButton';
import BaseRow from '../../base/BaseRow';

/**
 * Renders a modal where a user can configure a cluster or delete it.
 */
export default function ClusterSettingsTab({cluster}: {cluster: Cluster}) {
	const deleteCluster_ = useCallback(() => {
		deleteCluster(cluster.id)
			.then(() => {
				window.location.pathname = '/';
			})
			.catch((error) => {
				reportError(error).catch(() => {});
			});
	}, [cluster.id]);

	return (
		<BaseRow direction="column" alignment="center" spacing={1}>
			<h1>Settings</h1>
			<table>
				<tbody>
					<tr>
						<td>
							<BaseButton
								onClick={() => deleteCluster_()}
								size="small"
								variant="negative"
							>
								Delete Group
							</BaseButton>
						</td>
					</tr>
				</tbody>
			</table>
		</BaseRow>
	);
}
