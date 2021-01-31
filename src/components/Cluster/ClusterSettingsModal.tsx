import { useContext } from 'react';
import { deleteCluster } from '../../api/api';
import Button from '../Base/BaseButton';
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
					<tr>
						<td>
							<Button onClick={() => deleteCluster_()} size="small" variant="negative">
								Delete Cluster
							</Button>
						</td>
						<td>Deletes this cluster.</td>
					</tr>
				</table>

				<BaseRow direction="row" alignment="center" spacing={1}>
					<Button onClick={() => save_()} size="small" style={{ flex: 1 }}>
						Save
					</Button>

					<Button onClick={() => onClose()} size="small" style={{ flex: 1 }}>
						Cancel
					</Button>
				</BaseRow>
			</BaseRow>
		</BaseModal>
	);
}
