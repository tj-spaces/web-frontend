import {useState} from 'react';
import AddFriendsModal from './AddFriendsModal';
import BaseText from '../base/BaseText';

export default function AddFriendsPressableText() {
	const [visible, setVisible] = useState(false);

	return (
		<>
			{visible && <AddFriendsModal onClose={() => setVisible(false)} />}
			<BaseText onClick={() => setVisible(true)} underline>
				Add Friends
			</BaseText>
		</>
	);
}
