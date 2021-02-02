import { useState } from 'react';
import BaseButton from '../Base/BaseButton';
import NavbarCreateModal from './NavbarCreateModal';

export default function NavbarCreateButton() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<BaseButton variant="theme" size="small" onClick={() => setIsOpen(true)}>
				Create
				{isOpen && <NavbarCreateModal close={() => setIsOpen(false)} />}
			</BaseButton>
		</>
	);
}
