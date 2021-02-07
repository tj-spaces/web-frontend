import { useState } from 'react';
import AddFriendsModal from './AddFriendsModal';
import BaseButton from '../Base/BaseButton';

export default function AddFriendsButton() {
	const [visible, setVisible] = useState(false);

	return (
		<>
			{visible && <AddFriendsModal onClose={() => setVisible(false)} />}
			<BaseButton variant="theme" size="small" onClick={() => setVisible(true)}>
				Add Friends
			</BaseButton>
		</>
	);
}
