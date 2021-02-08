import {useCallback, useContext} from 'react';
import {deleteCluster} from '../../api/api';
import BaseButton from '../base/BaseButton';
import BaseModal from '../base/BaseModal';
import BaseRow from '../base/BaseRow';
import ClusterIDContext from './CurrentClusterContext';

/**
 * Renders a modal where a user can configure a cluster or delete it.
 */
export default function ClusterSettingsModal({onClose}: {onClose: () => void}) {
	const currentCluster = useContext(ClusterIDContext);

	const deleteCluster_ = useCallback(() => {
		deleteCluster(currentCluster.id!);
	}, [currentCluster.id]);

	const save_ = useCallback(() => {
		// Saving code goes here
		onClose();
	}, [onClose]);

	return (
		<BaseModal onClickOutside={() => onClose()}>
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
