import Box from '../../Box/Box';
import Button from '../../Button/Button';
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
		<Modal>
			<h1>Settings</h1>
			<Box variant="buttonRow">
				<Button onClick={() => deleteCluster_()} className="button button-small background-color-warn">
					Delete Cluster
				</Button>
			</Box>

			<Box variant="buttonRow">
				<Button onClick={() => save_()} className="button button-small margin-right-1">
					Save
				</Button>

				<Button onClick={() => onClose()} className="button button-small">
					Cancel
				</Button>
			</Box>
		</Modal>
	);
}
