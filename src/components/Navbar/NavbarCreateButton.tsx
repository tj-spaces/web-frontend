import { useState } from 'react';
import BaseButton from '../Base/BaseButton';
import CreateModal from '../CreateModal/CreateModal';

export default function NavbarCreateButton() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{isOpen && <CreateModal onClose={() => setIsOpen(false)} />}
			<BaseButton variant="theme" size="small" onClick={() => setIsOpen(true)}>
				Create
			</BaseButton>
		</>
	);
}
