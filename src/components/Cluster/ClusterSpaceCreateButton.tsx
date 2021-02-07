import {useState} from 'react';
import BaseButton from '../Base/BaseButton';
import SpaceCreateModal from './ClusterSpaceCreateModal';

/**
 * Renders a button that a user can use to start a space in a cluster. When this is clicked,
 * it opens a modal with settings for creating the space.
 */
export default function ClusterSpaceCreateButton() {
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
