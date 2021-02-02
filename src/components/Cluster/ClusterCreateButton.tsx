import { useState } from 'react';
import ClusterCreateModal from './ClusterCreateModal';

export default function ClusterCreateButton() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<h1 onClick={() => setIsOpen(true)} style={{ cursor: 'pointer' }}>
				+
			</h1>
			{isOpen && <ClusterCreateModal onClose={() => setIsOpen(false)} />}
		</>
	);
}
