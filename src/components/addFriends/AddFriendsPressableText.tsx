/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
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
