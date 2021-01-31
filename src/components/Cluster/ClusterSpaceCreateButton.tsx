import { useState } from 'react';
import Button from '../Base/BaseButton';
import SpaceCreateModal from './ClusterSpaceCreateModal';

export default function SpaceCreateButton() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<Button onClick={() => setIsOpen(true)} size="small">
				Create Space
			</Button>
			{isOpen && <SpaceCreateModal onClose={() => setIsOpen(false)} />}
		</>
	);
}
