import { useState } from 'react';
import BaseButton from './Base/BaseButton';
import CreateInstantSpaceModal from './CreateInstantSpaceModal';

export default function CreateInstantSpaceButton() {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			{modalOpen && <CreateInstantSpaceModal onClose={() => setModalOpen(false)} />}
			<BaseButton variant="theme" size="small" onClick={() => setModalOpen(true)}>
				Start A Space
			</BaseButton>
		</>
	);
}
