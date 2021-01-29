import Box from '../../Box/Box';
import Button from '../../BaseButton/BaseButton';
import Modal from '../../Modal/Modal';

import { deleteCluster } from '../../../api/api';
import { useContext } from 'react';
import CurrentClusterContext from '../CurrentClusterContext/CurrentClusterContext';

export default function ClusterSettingsModal({ onClose }: { onClose: () => void }) {
	const currentCluster = useContext(CurrentClusterContext);

	const deleteCluster_ = () => {
		deleteCluster(currentCluster.id!);
	};

	const save_ = () => {
		// Saving code goes here
		onClose();
	};

	return (
		<Modal onClickOutside={() => onClose()}>
			<h1>Settings</h1>
			<Box variant="buttonRow">
				<Button onClick={() => deleteCluster_()} size="small" variant="negative">
					Delete Cluster
				</Button>
			</Box>

			<Box variant="buttonRow">
				<Button onClick={() => save_()} size="small">
					Save
				</Button>

				<Button onClick={() => onClose()} size="small">
					Cancel
				</Button>
			</Box>
		</Modal>
	);
}
