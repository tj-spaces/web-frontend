/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {AssertionError} from 'assert';
import {useCallback, useContext} from 'react';
import {deleteCluster} from '../../api/clusters';
import BaseButton from '../base/BaseButton';
import BaseModal from '../base/BaseModal';
import BaseRow from '../base/BaseRow';
import CurrentClusterContext from './CurrentClusterContext';

/**
 * Renders a modal where a user can configure a cluster or delete it.
 */
export default function ClusterSettingsModal({onClose}: {onClose: () => void}) {
	const currentCluster = useContext(CurrentClusterContext);

	if (currentCluster == null) {
		throw new AssertionError({message: 'Cluster was null'});
	}

	const deleteCluster_ = useCallback(() => {
		deleteCluster(currentCluster.id);
	}, [currentCluster.id]);

	const save_ = useCallback(() => {
		// Saving code goes here
		onClose();
	}, [onClose]);

	return (
		<BaseModal onClose={() => onClose()}>
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
									Delete Cluster
								</BaseButton>
							</td>
							<td>Deletes this cluster.</td>
						</tr>
					</tbody>
				</table>

				<BaseRow direction="row" alignment="center" spacing={1}>
					<BaseButton onClick={() => save_()} size="small" style={{flex: 1}}>
						Save
					</BaseButton>

					<BaseButton onClick={() => onClose()} size="small" style={{flex: 1}}>
						Cancel
					</BaseButton>
				</BaseRow>
			</BaseRow>
		</BaseModal>
	);
}
