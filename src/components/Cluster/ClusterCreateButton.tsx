import { useState } from 'react';
import ClusterCreateModal from './ClusterCreateModal';

export default function ClusterCreateButton() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<div aria-label="Create Cluster" onClick={() => setIsOpen(true)} style={{ cursor: 'pointer' }}>
				+
			</div>
			{isOpen && <ClusterCreateModal onClose={() => setIsOpen(false)} />}
		</>
	);
}
