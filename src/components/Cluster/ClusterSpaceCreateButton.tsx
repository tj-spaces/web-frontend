import { useState } from 'react';
import BaseButton from '../Base/BaseButton';
import SpaceCreateModal from './ClusterSpaceCreateModal';

export default function SpaceCreateButton() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<BaseButton onClick={() => setIsOpen(true)} size="small">
				Create Space
			</BaseButton>
			{isOpen && <SpaceCreateModal onClose={() => setIsOpen(false)} />}
		</>
	);
}
