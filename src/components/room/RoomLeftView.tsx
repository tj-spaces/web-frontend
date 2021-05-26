import BaseButton from '@components/base/BaseButton';
import {useRoomID, useRoomSDK} from './useRoom';

export default function RoomLeftView() {
	const id = useRoomID();
	const roomSDK = useRoomSDK();
	return (
		<>
			<h1>You left the room</h1>
			<BaseButton variant="theme" onClick={() => roomSDK.join(id)}>
				Rejoin
			</BaseButton>
		</>
	);
}
