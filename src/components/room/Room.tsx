import {createStylesheet} from 'src/styles/createStylesheet';
import {useRoomConnectionState, useRoomSDK} from './useRoom';
import RoomLeftView from './RoomLeftView';
import RoomActiveView from './RoomActiveView';
import {useEffect} from 'react';

const styles = createStylesheet({
	room: {
		marginLeft: '2rem',
		marginRight: '2rem',
		minWidth: '20rem',
	},
});

export default function Room({id}: {id: string}) {
	const roomSDK = useRoomSDK();

	useEffect(() => {
		roomSDK.join(id);
		return () => {
			roomSDK.leave();
		};
	}, [id, roomSDK]);

	const connectionState = useRoomConnectionState();
	return (
		<div className={styles('room')}>
			{connectionState === 'disconnected' ? (
				<RoomLeftView />
			) : connectionState === 'connecting' ? null : (
				<RoomActiveView />
			)}
		</div>
	);
}
