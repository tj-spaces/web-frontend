import { useContext } from 'react';
import { deleteCluster } from '../../api/api';
import BaseButton from '../Base/BaseButton';
import BaseModal from '../Base/BaseModal';
import BaseRow from '../Base/BaseRow';
import ClusterIDContext from './CurrentClusterContext';

export default function ClusterSettingsModal({ onClose }: { onClose: () => void }) {
	const currentCluster = useContext(ClusterIDContext);

	const deleteCluster_ = () => {
		deleteCluster(currentCluster.id!);
	};

	const save_ = () => {
		// Saving code goes here
		onClose();
	};

	return (
		<BaseModal onClickOutside={() => onClose()}>
			<BaseRow direction="column" alignment="center" spacing={1}>
				<h1>Settings</h1>
				<table>
					<tbody>
						<tr>
							<td>
								<BaseButton onClick={() => deleteCluster_()} size="small" variant="negative">
									Delete Cluster
								</BaseButton>
							</td>
							<td>Deletes this cluster.</td>
						</tr>
					</tbody>
				</table>

				<BaseRow direction="row" alignment="center" spacing={1}>
					<BaseButton onClick={() => save_()} size="small" style={{ flex: 1 }}>
						Save
					</BaseButton>

					<BaseButton onClick={() => onClose()} size="small" style={{ flex: 1 }}>
						Cancel
					</BaseButton>
				</BaseRow>
			</BaseRow>
		</BaseModal>
	);
}
